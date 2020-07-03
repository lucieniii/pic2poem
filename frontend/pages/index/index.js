// index.js
Page({
  // 页面的初始数据
  data: {
    // result: 'homepic.png',
    result: '', // 上传图片的本地地址
    info: '', // 上传成功信息
    debug: '', // 上传图片的服务器地址
    // poem: '',
    sentence1: '',
    sentence2: '', // 分成两句
    typeG: 0,
    imagePath: '',
    items: [{
        name: 'AI',
        value: 'AI作诗',
        checked: 'true'
      },
      {
        name: 'Search',
        value: '诗歌匹配'
      },
    ]
  },

  chooseType: function () {
    this.data.typeG ^= 1;
    console.log(this.data.typeG);
  },

  myimg: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有

      success: function (res) {
        // 返回选定照片的本地文件路径列表
        var tempFilePaths = res.tempFilePaths; // tempFilePath 可以作为 img 标签的 src 属性显示图片
        that.setData({
          result: tempFilePaths[0],
          //result: '1.png',
          info: '正在上传...',
          sentence1: '',
          sentence2: '',
          setShow: 'none',
          textareaHeight: '0'
        });

        wx.uploadFile({
          url: 'http://47.100.9.234:8080/upload', // 接口地址（这是测试地址）
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'Content-Type': 'multipart/form-data'
          },

          success: function (res) {
            that.data.imagePath = res.data;
            console.log(1);
            that.setData({
              info: 'AI 正在为您生成诗句...', // 上传成功后的提示
              textareaHeight: '0',
            });

            wx.request({
              url: 'http://47.100.9.234:8080/generate?url=' + that.data.imagePath + '&typeG=' + that.data.typeG,
              method: 'GET',
              header: {
                'Content-type': 'application/json'
              },

              success: function (res) {
                var returnJSON = res.data;
                console.log(returnJSON);

                var errSign = returnJSON.indexOf("字典");
                var errSign2 = -1; //returnJSON.indexOf('*');

                var count = 0;
                for (var index = 0; index <= returnJSON.length; index++) {
                  if (returnJSON[index] == '。')
                    count++;
                  /*
                  if (returnJSON[index] == '*')
                    returnJSON[index] = "之"
                    returnJSON = returnJSON.slice(0, index) + "之" + returnJSON.slice(index);*/
                }
                var errSign3 = count;
                console.log(errSign3);
                if (errSign <= -1 && errSign2 <= -1 && count > 0) {
                  returnJSON = returnJSON.split('。');
                  var poem = "";
                  for (var index = 0; index < count; index++) {
                    poem += returnJSON[index] + "。\n"
                  }
                  console.log(poem);
                  that.setData({
                    info: '生成成功！',
                    textareaHeight: count * 20,
                    sentence1: poem,
                    setShow: 'block'
                  });
                } else {
                  that.setData({
                    info: '生成失败 QAQ',
                    sentence1: "我们的 AI 太笨了",
                    sentence2: "请尽量上传较为纯粹的风景图"
                  });
                }
              }
            });
          },
          fail: function () {
            that.setData({
              info: '上传失败'
            });
          },
          complete: function () {}
        });
      },
      fail: function () {},
      complete: function () {}
    });
  },

  again: function () {
    var that = this;
    that.setData({
      info: 'AI 正在为您生成诗句...',
      sentence1: '',
      textareaHeight: '0',
    });
    wx.request({
      url: 'http://47.100.9.234:8080/generate?url=' + that.data.imagePath + '&typeG=' + that.data.typeG,
      method: 'GET',
      header: {
        'Content-type': 'application/json'
      },

      success: function (res) {
        var returnJSON = res.data;
        console.log(returnJSON);

        var errSign = returnJSON.indexOf("字典");
        var errSign2 = -1; //returnJSON.indexOf('*');

        var count = 0;
        for (var index = 0; index <= returnJSON.length; index++) {
          if (returnJSON[index] == '。')
            count++;
        }
        var errSign3 = count;
        console.log(errSign3);
        if (errSign <= -1 && errSign2 <= -1 && count > 0) {
          returnJSON = returnJSON.split('。');
          var poem = "";
          for (var index = 0; index < count; index++) {
            poem += returnJSON[index] + "。\n"
          }
          console.log(poem);
          that.setData({
            info: '生成成功！',
            textareaHeight: count * 20,
            sentence1: poem,
            setShow: 'block'
          });
        } else {
          that.setData({
            info: '生成失败 QAQ',
            sentence1: "我们的 AI 太笨了",
            sentence2: "请尽量上传较为纯粹的风景图"
          });
        }
      }
    });
  },

  // 生命周期函数 监听页面加载
  onLoad: function (options) {
    this.setData({
      setShow: 'none',
      textareaHeight: '0',
    });
  },

  // 生命周期函数 监听页面初次渲染完成
  onReady: function () {}
});