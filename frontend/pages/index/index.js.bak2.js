// index.js
Page({
  // 页面的初始数据
  data: {
    result: 'homepic.png', // 上传图片的本地地址
    info: '', // 上传成功信息
    debug: '', // 上传图片的服务器地址
    // poem: '', 
    sentence1: '',
    sentence2: '' // 分成两句
  },

  myimg: function() {
    var that = this;

    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有

      success: function(res) {
        // 返回选定照片的本地文件路径列表
        var tempFilePaths = res.tempFilePaths; // tempFilePath 可以作为 img 标签的 src 属性显示图片
        that.setData({
          result: tempFilePaths[0],
          info: '正在上传...',
          sentence1: '',
          sentence2: ''
        });

        wx.uploadFile({
          url: 'http://101.132.75.111:8080/upload', // 接口地址（这是测试地址）
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'Content-Type': 'multipart/form-data'
          },

          success: function(res) {
            var imgPath = res.data;

            that.setData({
              info: 'AI 正在为您生成诗句...', // 上传成功后的提示
            });

            wx.request({
              url: 'http://101.132.75.111:8080/generate?url=' + imgPath,
              method: 'GET',
              header: {
                'Content-type': 'application/json'
              },

              success: function(res) {
                var returnJSON = res.data;
                console.log(returnJSON);

                var errSign = returnJSON.indexOf("字典");
                var errSign2 = returnJSON.indexOf('*');
                var errSign3 = returnJSON[returnJSON.length - 1] == '。' ? -1 : 1;

                if (errSign <= -1 && errSign2 <= -1 && errSign3 <= -1) {
                  returnJSON = returnJSON.split('。');
                  var poem1 = returnJSON[0].concat('。\n');
                  var poem2 = returnJSON[1].concat('。\n');
                  console.log(poem1 + poem2);

                  that.setData({
                    info: '生成成功！',
                    sentence1: poem1,
                    sentence2: poem2
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
          fail: function() {
            that.setData({
              info: '上传失败'
            });
          },
          complete: function() {}
        });
      },
      fail: function() {},
      complete: function() {}
    });
  },

  // 生命周期函数 监听页面加载
  onLoad: function(options) {},

  // 生命周期函数 监听页面初次渲染完成
  onReady: function() {}
});