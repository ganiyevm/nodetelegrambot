const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs')
require('dotenv').config() // O'z tokeningizni kiriting
const BOT_TOKEN=process.env.BOT_TOKEN
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Вы можете добавить больше фильмов
const movies = [
  {
    title: '🎥 «Жить жизнь», сезон 20 (2024)',
    photo: 'https://www.kino-teatr.ru/movie/posters/big/6/172066.jpg',
    shortVideo: 'https://t.me/movies_filmy/4852',
    fullVideo: 'https://t.me/Brigada_Series/26',
    sourceLink: 'https://vk.com/video-162803794_456239163',
    description: '🎬 Жанр: драма, триллер '
  },
  {
    title: '🎥 Не говори никому (2024)',
    photo: 'https://upload.wikimedia.org/wikipedia/ru/6/6e/%D0%9D%D0%B5_%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B8_%D0%BD%D0%B8%D0%BA%D0%BE%D0%BC%D1%83_%28%D1%84%D0%B8%D0%BB%D1%8C%D0%BC%2C_2024%29.jpg',
    shortVideo: "https://t.me/movies_filmy/4849",
    fullVideo: 'https://t.me/Brigada_Series/32',
    sourceLink: 'https://t.me/Brigada_Series/32',
    description: '🎬 Жанр: триллер, драма'
  },
  {
    title: '🎥 Ворон (2024)',
    photo: 'https://upload.wikimedia.org/wikipedia/ru/2/20/The_Crow_2024_poster.jpg',
    shortVideo: 'https://t.me/movies_filmy/4848',
    fullVideo: 'https://t.me/Qizim_seriali_0/3127',
    sourceLink: 'https://t.me/Qizim_seriali_0/3127',
    description: '🎬 Жанр: фэнтези, боевик, мелодрама, криминал '
  },
  {
    title: '🎥 Подай знак (2024)',
    photo: 'https://img.tartugi.net/uploads/posts/2024-08/1724408273_poday-znak-h.jpg',
    shortVideo: 'https://t.me/movies_filmy/4844',
    fullVideo: 'https://t.me/kurtlarvadisicinema/59',
    sourceLink: 'https://t.me/kurtlarvadisicinema/59',
    description: '🎬 Жанр: триллер, детектив'
  },
  // {
  //   title: 'Film 5',
  //   photo: 'https://www.google.com/imgres?q=ray%20pod%20nogami%20materey&imgurl=https%3A%2F%2Fstatic.kinoafisha.info%2Fk%2Fmovie_posters%2Fcanvas%2F800x1200%2Fupload%2Fmovie_posters%2F6%2F7%2F7%2F8374776%2F295324141319.jpg&imgrefurl=https%3A%2F%2Fuz.kinoafisha.info%2Fmovies%2F8374776%2F&docid=V8WHpeHjhO-0bM&tbnid=6-BUVa2PwOTT3M&vet=12ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA..i&w=800&h=1200&hcb=2&ved=2ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA',
  //   shortVideo: 'https://t.me/movies_filmy/4852',
  //   fullVideo: '/Users/hiramoo/Desktop/telegram_bot/media/fullmovies/y2mate_com_Головоломка_2_Фрагмент_из_мультфильма_2_2024_360p.mp4',
  //   sourceLink: 'URL_MANZIL_1',
  //   description: 'Film 1 haqida qisqa ma\'lumot.'
  // },
  // {
  //   title: 'Film 6',
  //   photo: 'https://www.google.com/imgres?q=ray%20pod%20nogami%20materey&imgurl=https%3A%2F%2Fstatic.kinoafisha.info%2Fk%2Fmovie_posters%2Fcanvas%2F800x1200%2Fupload%2Fmovie_posters%2F6%2F7%2F7%2F8374776%2F295324141319.jpg&imgrefurl=https%3A%2F%2Fuz.kinoafisha.info%2Fmovies%2F8374776%2F&docid=V8WHpeHjhO-0bM&tbnid=6-BUVa2PwOTT3M&vet=12ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA..i&w=800&h=1200&hcb=2&ved=2ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA',
  //   shortVideo: 'https://t.me/movies_filmy/4852',
  //   fullVideo: '/Users/hiramoo/Desktop/telegram_bot/media/fullmovies/y2mate_com_Головоломка_2_Фрагмент_из_мультфильма_2_2024_360p.mp4',
  //   sourceLink: 'URL_MANZIL_1',
  //   description: 'Film 1 haqida qisqa ma\'lumot.'
  // },
  // {
  //   title: 'Film 7',
  //   photo: 'https://www.google.com/imgres?q=ray%20pod%20nogami%20materey&imgurl=https%3A%2F%2Fstatic.kinoafisha.info%2Fk%2Fmovie_posters%2Fcanvas%2F800x1200%2Fupload%2Fmovie_posters%2F6%2F7%2F7%2F8374776%2F295324141319.jpg&imgrefurl=https%3A%2F%2Fuz.kinoafisha.info%2Fmovies%2F8374776%2F&docid=V8WHpeHjhO-0bM&tbnid=6-BUVa2PwOTT3M&vet=12ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA..i&w=800&h=1200&hcb=2&ved=2ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA',
  //   shortVideo: 'https://t.me/movies_filmy/4852',
  //   fullVideo: '/Users/hiramoo/Desktop/telegram_bot/media/fullmovies/y2mate_com_Головоломка_2_Фрагмент_из_мультфильма_2_2024_360p.mp4',
  //   sourceLink: 'URL_MANZIL_1',
  //   description: 'Film 1 haqida qisqa ma\'lumot.'
  // },
  // {
  //   title: 'Film 8',
  //   photo: 'https://www.google.com/imgres?q=ray%20pod%20nogami%20materey&imgurl=https%3A%2F%2Fstatic.kinoafisha.info%2Fk%2Fmovie_posters%2Fcanvas%2F800x1200%2Fupload%2Fmovie_posters%2F6%2F7%2F7%2F8374776%2F295324141319.jpg&imgrefurl=https%3A%2F%2Fuz.kinoafisha.info%2Fmovies%2F8374776%2F&docid=V8WHpeHjhO-0bM&tbnid=6-BUVa2PwOTT3M&vet=12ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA..i&w=800&h=1200&hcb=2&ved=2ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA',
  //   shortVideo: 'https://t.me/movies_filmy/4852',
  //   fullVideo: '/Users/hiramoo/Desktop/telegram_bot/media/fullmovies/y2mate_com_Головоломка_2_Фрагмент_из_мультфильма_2_2024_360p.mp4',
  //   sourceLink: 'URL_MANZIL_1',
  //   description: 'Film 1 haqida qisqa ma\'lumot.'
  // },
  // {
  //   title: 'Film 9',
  //   photo: 'https://www.google.com/imgres?q=ray%20pod%20nogami%20materey&imgurl=https%3A%2F%2Fstatic.kinoafisha.info%2Fk%2Fmovie_posters%2Fcanvas%2F800x1200%2Fupload%2Fmovie_posters%2F6%2F7%2F7%2F8374776%2F295324141319.jpg&imgrefurl=https%3A%2F%2Fuz.kinoafisha.info%2Fmovies%2F8374776%2F&docid=V8WHpeHjhO-0bM&tbnid=6-BUVa2PwOTT3M&vet=12ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA..i&w=800&h=1200&hcb=2&ved=2ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA',
  //   shortVideo: 'https://t.me/movies_filmy/4852',
  //   fullVideo: '/Users/hiramoo/Desktop/telegram_bot/media/fullmovies/y2mate_com_Головоломка_2_Фрагмент_из_мультфильма_2_2024_360p.mp4',
  //   sourceLink: 'URL_MANZIL_1',
  //   description: 'Film 1 haqida qisqa ma\'lumot.'
  // },
  // {
  //   title: 'Film 10',
  //   photo: 'https://www.google.com/imgres?q=ray%20pod%20nogami%20materey&imgurl=https%3A%2F%2Fstatic.kinoafisha.info%2Fk%2Fmovie_posters%2Fcanvas%2F800x1200%2Fupload%2Fmovie_posters%2F6%2F7%2F7%2F8374776%2F295324141319.jpg&imgrefurl=https%3A%2F%2Fuz.kinoafisha.info%2Fmovies%2F8374776%2F&docid=V8WHpeHjhO-0bM&tbnid=6-BUVa2PwOTT3M&vet=12ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA..i&w=800&h=1200&hcb=2&ved=2ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA',
  //   shortVideo: 'https://t.me/movies_filmy/4852',
  //   fullVideo: '/Users/hiramoo/Desktop/telegram_bot/media/fullmovies/y2mate_com_Головоломка_2_Фрагмент_из_мультфильма_2_2024_360p.mp4',
  //   sourceLink: 'URL_MANZIL_1',
  //   description: 'Film 1 haqida qisqa ma\'lumot.'
  // },
  // {
  //   title: 'Film 11',
  //   photo: 'https://www.google.com/imgres?q=ray%20pod%20nogami%20materey&imgurl=https%3A%2F%2Fstatic.kinoafisha.info%2Fk%2Fmovie_posters%2Fcanvas%2F800x1200%2Fupload%2Fmovie_posters%2F6%2F7%2F7%2F8374776%2F295324141319.jpg&imgrefurl=https%3A%2F%2Fuz.kinoafisha.info%2Fmovies%2F8374776%2F&docid=V8WHpeHjhO-0bM&tbnid=6-BUVa2PwOTT3M&vet=12ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA..i&w=800&h=1200&hcb=2&ved=2ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA',
  //   shortVideo: 'https://t.me/movies_filmy/4852',
  //   fullVideo: '/Users/hiramoo/Desktop/telegram_bot/media/fullmovies/y2mate_com_Головоломка_2_Фрагмент_из_мультфильма_2_2024_360p.mp4',
  //   sourceLink: 'URL_MANZIL_1',
  //   description: 'Film 1 haqida qisqa ma\'lumot.'
  // },
  // {
  //   title: 'Film 12',
  //   photo: 'https://www.google.com/imgres?q=ray%20pod%20nogami%20materey&imgurl=https%3A%2F%2Fstatic.kinoafisha.info%2Fk%2Fmovie_posters%2Fcanvas%2F800x1200%2Fupload%2Fmovie_posters%2F6%2F7%2F7%2F8374776%2F295324141319.jpg&imgrefurl=https%3A%2F%2Fuz.kinoafisha.info%2Fmovies%2F8374776%2F&docid=V8WHpeHjhO-0bM&tbnid=6-BUVa2PwOTT3M&vet=12ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA..i&w=800&h=1200&hcb=2&ved=2ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA',
  //   shortVideo: 'https://t.me/movies_filmy/4852',
  //   fullVideo: '/Users/hiramoo/Desktop/telegram_bot/media/fullmovies/y2mate_com_Головоломка_2_Фрагмент_из_мультфильма_2_2024_360p.mp4',
  //   sourceLink: 'URL_MANZIL_1',
  //   description: 'Film 1 haqida qisqa ma\'lumot.'
  // },
  // {
  //   title: 'Film 13',
  //   photo: 'https://www.google.com/imgres?q=ray%20pod%20nogami%20materey&imgurl=https%3A%2F%2Fstatic.kinoafisha.info%2Fk%2Fmovie_posters%2Fcanvas%2F800x1200%2Fupload%2Fmovie_posters%2F6%2F7%2F7%2F8374776%2F295324141319.jpg&imgrefurl=https%3A%2F%2Fuz.kinoafisha.info%2Fmovies%2F8374776%2F&docid=V8WHpeHjhO-0bM&tbnid=6-BUVa2PwOTT3M&vet=12ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA..i&w=800&h=1200&hcb=2&ved=2ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA',
  //   shortVideo: 'https://t.me/movies_filmy/4852',
  //   fullVideo: '/Users/hiramoo/Desktop/telegram_bot/media/fullmovies/y2mate_com_Головоломка_2_Фрагмент_из_мультфильма_2_2024_360p.mp4',
  //   sourceLink: 'URL_MANZIL_1',
  //   description: 'Film 1 haqida qisqa ma\'lumot.'
  // },
  // {
  //   title: 'Film 14',
  //   photo: 'https://www.google.com/imgres?q=ray%20pod%20nogami%20materey&imgurl=https%3A%2F%2Fstatic.kinoafisha.info%2Fk%2Fmovie_posters%2Fcanvas%2F800x1200%2Fupload%2Fmovie_posters%2F6%2F7%2F7%2F8374776%2F295324141319.jpg&imgrefurl=https%3A%2F%2Fuz.kinoafisha.info%2Fmovies%2F8374776%2F&docid=V8WHpeHjhO-0bM&tbnid=6-BUVa2PwOTT3M&vet=12ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA..i&w=800&h=1200&hcb=2&ved=2ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA',
  //   shortVideo: 'https://t.me/movies_filmy/4852',
  //   fullVideo: '/Users/hiramoo/Desktop/telegram_bot/media/fullmovies/y2mate_com_Головоломка_2_Фрагмент_из_мультфильма_2_2024_360p.mp4',
  //   sourceLink: 'URL_MANZIL_1',
  //   description: 'Film 1 haqida qisqa ma\'lumot.'
  // },
  // {
  //   title: 'Film 15',
  //   photo: 'https://www.google.com/imgres?q=ray%20pod%20nogami%20materey&imgurl=https%3A%2F%2Fstatic.kinoafisha.info%2Fk%2Fmovie_posters%2Fcanvas%2F800x1200%2Fupload%2Fmovie_posters%2F6%2F7%2F7%2F8374776%2F295324141319.jpg&imgrefurl=https%3A%2F%2Fuz.kinoafisha.info%2Fmovies%2F8374776%2F&docid=V8WHpeHjhO-0bM&tbnid=6-BUVa2PwOTT3M&vet=12ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA..i&w=800&h=1200&hcb=2&ved=2ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA',
  //   shortVideo: 'https://t.me/movies_filmy/4852',
  //   fullVideo: '/Users/hiramoo/Desktop/telegram_bot/media/fullmovies/y2mate_com_Головоломка_2_Фрагмент_из_мультфильма_2_2024_360p.mp4',
  //   sourceLink: 'URL_MANZIL_1',
  //   description: 'Film 1 haqida qisqa ma\'lumot.'
  // },
  // {
  //   title: 'Film 16',
  //   photo: 'https://www.google.com/imgres?q=ray%20pod%20nogami%20materey&imgurl=https%3A%2F%2Fstatic.kinoafisha.info%2Fk%2Fmovie_posters%2Fcanvas%2F800x1200%2Fupload%2Fmovie_posters%2F6%2F7%2F7%2F8374776%2F295324141319.jpg&imgrefurl=https%3A%2F%2Fuz.kinoafisha.info%2Fmovies%2F8374776%2F&docid=V8WHpeHjhO-0bM&tbnid=6-BUVa2PwOTT3M&vet=12ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA..i&w=800&h=1200&hcb=2&ved=2ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA',
  //   shortVideo: 'https://t.me/movies_filmy/4852',
  //   fullVideo: '/Users/hiramoo/Desktop/telegram_bot/media/fullmovies/y2mate_com_Головоломка_2_Фрагмент_из_мультфильма_2_2024_360p.mp4',
  //   sourceLink: 'URL_MANZIL_1',
  //   description: 'Film 1 haqida qisqa ma\'lumot.'
  // },
  // {
  //   title: 'Film 17',
  //   photo: 'https://www.google.com/imgres?q=ray%20pod%20nogami%20materey&imgurl=https%3A%2F%2Fstatic.kinoafisha.info%2Fk%2Fmovie_posters%2Fcanvas%2F800x1200%2Fupload%2Fmovie_posters%2F6%2F7%2F7%2F8374776%2F295324141319.jpg&imgrefurl=https%3A%2F%2Fuz.kinoafisha.info%2Fmovies%2F8374776%2F&docid=V8WHpeHjhO-0bM&tbnid=6-BUVa2PwOTT3M&vet=12ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA..i&w=800&h=1200&hcb=2&ved=2ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA',
  //   shortVideo: 'https://t.me/movies_filmy/4852',
  //   fullVideo: '/Users/hiramoo/Desktop/telegram_bot/media/fullmovies/y2mate_com_Головоломка_2_Фрагмент_из_мультфильма_2_2024_360p.mp4',
  //   sourceLink: 'URL_MANZIL_1',
  //   description: 'Film 1 haqida qisqa ma\'lumot.'
  // },
  // {
  //   title: 'Film 18',
  //   photo: 'https://www.google.com/imgres?q=ray%20pod%20nogami%20materey&imgurl=https%3A%2F%2Fstatic.kinoafisha.info%2Fk%2Fmovie_posters%2Fcanvas%2F800x1200%2Fupload%2Fmovie_posters%2F6%2F7%2F7%2F8374776%2F295324141319.jpg&imgrefurl=https%3A%2F%2Fuz.kinoafisha.info%2Fmovies%2F8374776%2F&docid=V8WHpeHjhO-0bM&tbnid=6-BUVa2PwOTT3M&vet=12ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA..i&w=800&h=1200&hcb=2&ved=2ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA',
  //   shortVideo: 'https://t.me/movies_filmy/4852',
  //   fullVideo: '/Users/hiramoo/Desktop/telegram_bot/media/fullmovies/y2mate_com_Головоломка_2_Фрагмент_из_мультфильма_2_2024_360p.mp4',
  //   sourceLink: 'URL_MANZIL_1',
  //   description: 'Film 1 haqida qisqa ma\'lumot.'
  // },
  // {
  //   title: 'Film 19',
  //   photo: 'https://www.google.com/imgres?q=ray%20pod%20nogami%20materey&imgurl=https%3A%2F%2Fstatic.kinoafisha.info%2Fk%2Fmovie_posters%2Fcanvas%2F800x1200%2Fupload%2Fmovie_posters%2F6%2F7%2F7%2F8374776%2F295324141319.jpg&imgrefurl=https%3A%2F%2Fuz.kinoafisha.info%2Fmovies%2F8374776%2F&docid=V8WHpeHjhO-0bM&tbnid=6-BUVa2PwOTT3M&vet=12ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA..i&w=800&h=1200&hcb=2&ved=2ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA',
  //   shortVideo: 'https://t.me/movies_filmy/4852',
  //   fullVideo: '/Users/hiramoo/Desktop/telegram_bot/media/fullmovies/y2mate_com_Головоломка_2_Фрагмент_из_мультфильма_2_2024_360p.mp4',
  //   sourceLink: 'URL_MANZIL_1',
  //   description: 'Film 1 haqida qisqa ma\'lumot.'
  // },
  // {
  //   title: 'Film 20',
  //   photo: 'https://www.google.com/imgres?q=ray%20pod%20nogami%20materey&imgurl=https%3A%2F%2Fstatic.kinoafisha.info%2Fk%2Fmovie_posters%2Fcanvas%2F800x1200%2Fupload%2Fmovie_posters%2F6%2F7%2F7%2F8374776%2F295324141319.jpg&imgrefurl=https%3A%2F%2Fuz.kinoafisha.info%2Fmovies%2F8374776%2F&docid=V8WHpeHjhO-0bM&tbnid=6-BUVa2PwOTT3M&vet=12ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA..i&w=800&h=1200&hcb=2&ved=2ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA',
  //   shortVideo: 'https://t.me/movies_filmy/4852',
  //   fullVideo: '/Users/hiramoo/Desktop/telegram_bot/media/fullmovies/y2mate_com_Головоломка_2_Фрагмент_из_мультфильма_2_2024_360p.mp4',
  //   sourceLink: 'URL_MANZIL_1',
  //   description: 'Film 1 haqida qisqa ma\'lumot.'
  // },
  // {
  //   title: 'Film 21',
  //   photo: 'https://www.google.com/imgres?q=ray%20pod%20nogami%20materey&imgurl=https%3A%2F%2Fstatic.kinoafisha.info%2Fk%2Fmovie_posters%2Fcanvas%2F800x1200%2Fupload%2Fmovie_posters%2F6%2F7%2F7%2F8374776%2F295324141319.jpg&imgrefurl=https%3A%2F%2Fuz.kinoafisha.info%2Fmovies%2F8374776%2F&docid=V8WHpeHjhO-0bM&tbnid=6-BUVa2PwOTT3M&vet=12ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA..i&w=800&h=1200&hcb=2&ved=2ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA',
  //   shortVideo: 'https://t.me/movies_filmy/4852',
  //   fullVideo: '/Users/hiramoo/Desktop/telegram_bot/media/fullmovies/y2mate_com_Головоломка_2_Фрагмент_из_мультфильма_2_2024_360p.mp4',
  //   sourceLink: 'URL_MANZIL_1',
  //   description: 'Film 1 haqida qisqa ma\'lumot.'
  // },
  // {
  //   title: 'Film 22',
  //   photo: 'https://www.google.com/imgres?q=ray%20pod%20nogami%20materey&imgurl=https%3A%2F%2Fstatic.kinoafisha.info%2Fk%2Fmovie_posters%2Fcanvas%2F800x1200%2Fupload%2Fmovie_posters%2F6%2F7%2F7%2F8374776%2F295324141319.jpg&imgrefurl=https%3A%2F%2Fuz.kinoafisha.info%2Fmovies%2F8374776%2F&docid=V8WHpeHjhO-0bM&tbnid=6-BUVa2PwOTT3M&vet=12ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA..i&w=800&h=1200&hcb=2&ved=2ahUKEwje_6nN58yIAxWsGhAIHdssKaUQM3oECBUQAA',
  //   shortVideo: 'https://t.me/movies_filmy/4852',
  //   fullVideo: '/Users/hiramoo/Desktop/telegram_bot/media/fullmovies/y2mate_com_Головоломка_2_Фрагмент_из_мультфильма_2_2024_360p.mp4',
  //   sourceLink: 'URL_MANZIL_1',
  //   description: 'Film 1 haqida qisqa ma\'lumot.'
  // },

  // Qo'shimcha filmlar qo'shishingiz mumkin

  
];

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const options = {
    reply_markup: {
      keyboard: [
        ['📸 photo', '🎥 short_video', '🎬 full_video'],
      ],
      resize_keyboard: true,
      
    }
  };
  await bot.sendMessage(chatId, 'Tanlovni tanlang:', options);
});
let lastSentIndex = -1;


bot.on('message', async (msg) => {
  const chatId = msg.from.id;
  const text = msg.text;

  if (text === '📸 photo' || text === '🎥 short_video' || text === '🎬 full_video') {
    let randomMovie;
    let currentIndex;

    do {
      currentIndex = Math.floor(Math.random() * movies.length);
      randomMovie = movies[currentIndex];
    } while (currentIndex === lastSentIndex);

    lastSentIndex = currentIndex; // Update last sent index

    try {
      if (text === '📸 photo') {
        await bot.sendPhoto(chatId, randomMovie.photo, {
          caption: `${randomMovie.title}\n${randomMovie.description}\n[Manzil](${randomMovie.sourceLink})`,
          parse_mode: 'Markdown'
        });
      } else if (text === '🎥 short_video') {
        await bot.sendVideo(chatId, randomMovie.shortVideo, {
          caption: `${randomMovie.title}\n${randomMovie.description}\n[Manzil](${randomMovie.sourceLink})`,
          parse_mode: 'Markdown'
        });
      }  else if (text === '🎬 full_video') {
        await bot.sendVideo(chatId, randomMovie.fullVideo,{
          caption: `${randomMovie.title}\n${randomMovie.description}\n[Manzil](${randomMovie.sourceLink})`,
          parse_mode: 'Markdown'
        } );}
    } catch (error) {
      console.log(error);
    }
  }
});



// bot.onText(/\/next/, async (msg) => {
//   const chatId = msg.chat.id;
//   const options = {
//     reply_markup: {
//       inline_keyboard: [
//         [{ text: '📸 Afrish', callback_data: 'photo' }],
//         [{ text: '🎥 Qisqa video', callback_data: 'short_video' }],
//         [{ text: '🎬 To‘liq film', callback_data: 'full_video' }]
//       ]
//     }
//   };
//   await bot.sendMessage(chatId, 'Tanlovni tanlang:', options);
// });

// bot.on('callback_query', async (query) => {
//   const chatId = query.message.chat.id;
//   const randomMovie = movies[Math.floor(Math.random() * movies.length)];

//   if (query.data === 'photo') {
//     try {
//       await bot.sendPhoto(chatId, randomMovie.photo, {
//         caption: `${randomMovie.title}\n${randomMovie.description}\n[Manzil](randomMovie.sourceLink)`,
//         parse_mode: 'Markdown'
//       });
//     } catch (error) {
//       console.log(error)
//     }
//   } else if (query.data === 'short_video') {
//     bot.sendVideo(chatId, randomMovie.shortVideo, {
//       caption: `${randomMovie.title}\n${randomMovie.description}\n[Manzil](randomMovie.sourceLink)`,
//       parse_mode: 'Markdown'
//     });
//   } else if (query.data === 'full_video') {
//     bot.sendVideo(chatId, `To‘liq film: ${randomMovie.fullVideo}\n[Manzil](randomMovie.sourceLink)`, { parse_mode: 'Markdown' });
//   }
// });

