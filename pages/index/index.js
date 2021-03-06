const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
}
const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
 }

Page({
  data: {
    nowTemp: '14°',
    nowWeather: '阴天',
    nowWeatherBackground: "",
    hourlyWeather:[]
  },
  onPullDownRefresh() {
    this.getNow(()=>{
        wx.stopPullDownRefresh()
    })
},
  onLoad(){
    this.getNow();
    console.log("hello world!");
  },
  getNow(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now/', //仅为示例，并非真实的接口地址
      data: {
        city: '北京市',
      },
      success: res =>{
        let result = res.data.result
        let temp = result.now.temp
        let weather = result.now.weather
        console.log(temp, weather)
        this.setData({
          nowTemp: temp+"°",
          nowWeather: weatherMap[weather],
          nowWeatherBackground: '/images/timg.jpg'
         })
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: weatherColorMap[weather],
        })
        let nowHour = new Date().getHours()
        let hourlyWeather=[];
        let forecast = result.forecast
        for (let i =0; i<8; i++){
          hourlyWeather.push({
                time: (i*3 + nowHour) % 24 + "时",
                iconPath: "/images/timg.jpg",
                temp: forecast[i].temp+"°"
            })
        }
        hourlyWeather[0].time="现在"
        this.setData({hourlyWeather:hourlyWeather});
      }, complete: () =>{
        callback && callback()
      }
    })
  }
})
