let LIVE_BACKEND_URL = 'https://mtsbackenddev.azurewebsites.net'
let DEV_BACKEND_URL = 'https://mtsbackenddev.azurewebsites.net'
let isDev = false
let BACKEND_URL = isDev ? DEV_BACKEND_URL : LIVE_BACKEND_URL
export default{
  IS_DEV: BACKEND_URL,
  BACKEND_URL: BACKEND_URL,
  TEST: false,
  GOOGLE: {
    API_KEY: 'AIzaSyDrRdwTpaLeofZGsv39i0OuMpDLiIQJIIk'
  },
  authorization: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2MDQ1NjEwNDEsImV4cCI6MTkxOTkyMTA0MSwiaXNzIjoiaHR0cHM6Ly9tdHNiYWNrZW5kZGV2LmF6dXJld2Vic2l0ZXMubmV0IiwiYXVkIjpbImh0dHBzOi8vbXRzYmFja2VuZGRldi5henVyZXdlYnNpdGVzLm5ldC9yZXNvdXJjZXMiLCJub3BfYXBpIl0sImNsaWVudF9pZCI6IjkzZTZjNDNlLTJjOTUtNGY3Yi04YzJiLWEwMTA5YmExODFiYyIsInN1YiI6IjkzZTZjNDNlLTJjOTUtNGY3Yi04YzJiLWEwMTA5YmExODFiYyIsImF1dGhfdGltZSI6MTYwNDU2MTAzOSwiaWRwIjoibG9jYWwiLCJzY29wZSI6WyJub3BfYXBpIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.qRvEbcmpAPO-qhMBJqk0jDCNbl_BsmBdVStz76P2uLQi37uS6SoitQ5AV31M8PijiOaLbJQQ4uddRpI7P45virWUseq7wq1Xi9KDpKduo9bnRKFHu3UwBJJo_Wmgl86V_tNiJpey7Xdswr80E6rWFCL-Nneh9kfcs9ka-Igg2cwLb0Hlt1BHd42IB-700S9g5SIQir4vcWPbWkotMyik2NORXwjS7lnta_lXlTnxC4xWMREMpBwt4x6J9eLLunmy9Dj6LypLWt20C-JEiCvBHEjDff0QviVEIcnsqys0CucZUQ-jCD3-jHoFPCC79-PmSFojcmXVG-M0FcON8iLArw',
  PUSHER: {
    appId: '1079335',
    key: 'fcc878c9ae95355398a8',
    secret: 'd5e212f122e005bd91ef',
    cluster: 'ap1',
    encrypted: true
  }
}