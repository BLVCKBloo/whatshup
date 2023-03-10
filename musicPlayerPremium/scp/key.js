const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const heading = $("header h2"),
  headingSinger = $("header h5"),
  cdThumb = $(".cd-right"),
  cdThumbRigh = $(".cd-thumb"),
  audio = $("#audio"),
  cd = $(".cd"),
  player = $(".player"),
  playBtn = $(".btn-toggle-play"),
  progress = $("#progress"),
  prevBtn = $(".btn-prev"),
  nextBtn = $(".btn-next"),
  randomBtn = $(".btn-random"),
  repeatBtn = $(".btn-repeat"),
  playList = $("#playlists"),
  favList = $("#favlist"),
  tabPlaylists = $$(".playlist"),
  delList = $("#dellist"),
  listBtn = $(".list-btn"),
  timeCurrent = $(".time-current"),
  playerList = $(".player-list"),
  volumeBar = $(".volume-bar"),
  volumeIcon = $$(".volume-icon"),
  getVolume = $(".volume"),
  volumeNumber = $(".volume-number"),
  timeDuration = $(".time-duration"),
  imgThumb = "/musicPlayerPremium/imgs/imgthumb",
  getPrimaryColor = $(".primary-color"),
  autoNextSongBtn = $(".autonext"),
  linkSong = "/musicPlayerPremium/music";
const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  isListShow: false,
  isNextSong: undefined,
  isOpenOption: false,
  isAutoNextSong: true,
  colors: [
    {
      color: "#2cccff",
    },
    {
      color: "#FF6651",
    },
    {
      color: "#20E3B2",
    },
    {
      color: " #6A5AF9",
    },
    {
      color: " #F62682",
    },
  ],
  favLists: [],
  delList: [],
  songs: [
    {
      name: "Waiting For You",
      singer: "MONO",
      path: `${linkSong}/waitingforyou.mp3`,
      image: `${imgThumb}/waitingforyou.jpg`,
      favorite: false,
      disableSong: false,
    },
    {
      name: "Chuyện Đôi Ta",
      singer: "Emcee L (Da LAB) ft Muộii ",
      path: `${linkSong}/chuyendoita.mp3`,
      image: `${imgThumb}/chuyendoita.jpg`,
      favorite: false,
      disableSong: false,
    },
    {
      name: "Đèo Bòng",
      singer: "KEYO",
      path: `${linkSong}/deobong.mp3`,
      image: `${imgThumb}/deobong.jpg`,
      favorite: false,
      disableSong: false,
    },

    {
      name: "Mặt Mộc",
      singer: "Phạm Nguyên Ngọc x VAnh x Ân Nhi",
      path: `${linkSong}/matmoc.mp3`,
      image: `${imgThumb}/matmoc.jpg`,
      favorite: false,
      disableSong: false,
    },
    {
      name: "Phải Lòng",
      singer: "Tăng Duy Tân ft. Phong Max",
      path: `${linkSong}/phailong.mp3`,
      image: `${imgThumb}/phailong.jpg`,
      favorite: false,
      disableSong: false,
    },
    {
      name: "Thức Giấc",
      singer: "Da Lab",
      path: `${linkSong}/thucgiac.mp3`,
      image: `${imgThumb}/thucgiac.jpg`,
      favorite: false,
      disableSong: false,
    },
    {
      name: "Xuất Giá",
      singer: "KEYO",
      path: `${linkSong}/xuatgia.mp3`,
      image: `${imgThumb}/xuatgia.jfif`,
      favorite: false,
      disableSong: false,
    },
    {
      name: "Thanh Xuân",
      singer: "Da Lab",
      path: `${linkSong}/thanhxuan.mp3`,
      image: `${imgThumb}/thanhxuan.jpg`,
      favorite: false,
      disableSong: false,
    },
  ],
  render: function () {
    $(".tabs-span").innerText = `${this.currentIndex + 1}/${this.songs.length}`;
    const renderColor = this.colors.map((cl, index) => {
      return `
      <div class="colorchange-cont-btn" style="background: ${cl.color};"></div>`;
    });

    const htmls = this.songs.map((song, index) => {
      return `
    <div class="song  ${
      index === this.currentIndex ? "active" : ""
    }" data-index="${index}">
    <div class="loader">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
    <div
      class="thumb"
      style="
        background-image: url('${song.image}');
      "
    ></div>
    <div class="body">
      <h3 class="title">${song.name}</h3>
      <p class="author">${song.singer}</p>
      <span class="title-span ${
        index === this.isNextSong ? "active" : ""
      }">Phát tiếp theo</span>
    </div>
    <div class="option">
      <i class="fas fa-ellipsis-h"></i>
      <ul class="option-list">
      <li  class="option-list-btn dellist delete-btn">Xóa</li>
      <li class="option-list-btn  nextsong-btn">${
        index != this.isNextSong ? "Phát tiếp theo" : "Hủy phát tiếp theo"
      }</li>
      <li class="option-list-btn ${song.favorite ? "active" : "favsong-btn"}">${
        song.favorite ? "Yêu thích" : "Thêm vào yêu thích"
      }</li>

      </ul>
    </div>
  </div>`;
    });
    const favhtml = this.favLists.map((song, index) => {
      return `
        <div class="song ${
          song.lastIndex === this.currentIndex ? "active" : ""
        }" data-index="${song.lastIndex}">
        <div class="loader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
        <div
          class="thumb"
          style="
            background-image: url('${song.image}');
          "
        ></div>
        <div class="body">
          <h3 class="title">${song.name}</h3>
          <p class="author">${song.singer}</p>
          <span class="title-span ${
            index === this.isNextSong ? "active" : ""
          }">Phát tiếp theo</span>
        </div>
        <div class="option">
          <i class="fas fa-ellipsis-h"></i>
          <ul class="option-list">
          <li  class="option-list-btn dellist ${
            song.favorite ? "fav-delete-btn" : "delete-btn"
          }">Xóa</li>
          <li class="option-list-btn  nextsong-btn">${
            index != this.isNextSong ? "Phát tiếp theo" : "Hủy phát tiếp theo"
          }</li>
          <li class="option-list-btn ${
            song.favorite ? "disable" : "favsong-btn"
          }">${song.favorite ? "Yêu thích" : "Thêm vào yêu thích"}</li>
          <li class="option-list-btn  ${
            song.favorite ? "del-favsong-btn" : "disable"
          }">Xóa khỏi yêu thích</li>
          </ul>
        </div>
      </div>
        `;
    });
    const delhtml = this.delList.map((song, index) => {
      return `
        <div class="song ${
          song.disableSong ? "disable-effect" : ""
        }" data-index="${index}">
        <div class="loader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
        <div
          class="thumb"
          style="
            background-image: url('${song.image}');
          "
        ></div>
        <div class="body">
          <h3 class="title">${song.name}</h3>
          <p class="author">${song.singer}</p>
          <span class="title-span ${
            index === this.isNextSong ? "active" : ""
          }">Phát tiếp theo</span>
        </div>
        <div class="option">
          <i class="fas fa-ellipsis-h"></i>
          <ul class="option-list">
          <li  class="option-list-btn re-delete-btn">Thu Hồi</li>
          </ul>
        </div>
      </div>
        `;
    });

    $(".primary-color").innerHTML = renderColor.join("");
    $(".secondary-color").innerHTML = renderColor.join("");
    $("#playlists").innerHTML = htmls.join("");
    $("#favlist").innerHTML = favhtml.join("");
    $("#dellist").innerHTML = delhtml.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvent: function () {
    this.render();
    const _this = this;
    cdWidth = cd.offsetWidth;
    const getSong = $$(".song");
    const cdThumbAnimated = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 15000,
      iterations: Infinity,
    });
    cdThumbAnimated.pause();
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop,
        newCdWidth = cdWidth - scrollTop;
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };
    playBtn.onclick = function () {
      _this.isPlaying ? audio.pause() : audio.play();
    };

    audio.onplay = function () {
      _this.isPlaying = true;
      cd.classList.add("active");
      player.classList.add("playing");
      var GetSongActive = playerList.querySelector(".song.active");
      GetSongActive
        ? GetSongActive.classList.add("playing")
        : GetSongActive.classList.remove("playing");
      cdThumbAnimated.play();
    };
    audio.onpause = function () {
      cd.classList.remove("active");
      var GetSongActive = playerList.querySelector(".song.active");
      GetSongActive
        ? GetSongActive.classList.remove("playing")
        : GetSongActive.classList.add("playing");
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimated.pause();
    };
    volumeIcon.forEach((btn) => {
      btn.onclick = (e) => {
        audio.volume = 0;
        getVolume.classList.add("mute");
        getVolume.classList.remove("off", "weak", "medium", "strong");
      };
    });
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const currentProgress = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = currentProgress;
      }
      const audioDuration = audio.duration;
      if (!isNaN(audioDuration)) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progress.value = progressPercent;
      }
      let current_minutes = Math.floor(audio.currentTime / 60);
      let current_seconds = Math.floor(
        audio.currentTime - current_minutes * 60
      );
      let duration_minutes = Math.floor(audio.duration / 60);
      let duration_seconds = Math.floor(audio.duration - duration_minutes * 60);
      if (current_minutes < 10) {
        current_minutes = `0${current_minutes}`;
      }
      if (current_seconds < 10) {
        current_seconds = `0${current_seconds}`;
      }
      if (duration_minutes < 10) {
        duration_minutes = `0${duration_minutes}`;
      }
      if (duration_seconds < 10) {
        duration_seconds = `0${duration_seconds}`;
      }
      timeCurrent.innerText = `${current_minutes}:${current_seconds}`;
      timeDuration.innerText = `${
        isNaN(duration_minutes) ? "00" : duration_minutes
      }:${isNaN(duration_seconds) ? "00" : duration_seconds}`;
    };
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };
    volumeBar.oninput = function (e) {
      const seekVolume = e.target.value / 100;
      const volumeValue = e.target.value;
      volumeNumber.innerText = `${volumeValue}%`;
      if (volumeValue > 0 && volumeValue <= 25) {
        getVolume.classList.add("off");
        getVolume.classList.remove("medium", "strong", "mute", "weak");
      }
      if (volumeValue > 25 && volumeValue <= 50) {
        getVolume.classList.add("weak");
        getVolume.classList.remove("medium", "off", "strong", "mute");
      }
      if (volumeValue > 50 && volumeValue <= 75) {
        getVolume.classList.add("medium");
        getVolume.classList.remove("weak", "off", "strong", "mute");
      }
      if (volumeValue > 75 && volumeValue <= 100) {
        getVolume.classList.add("strong");
        getVolume.classList.remove("weak", "off", "medium", "mute");
      }
      audio.volume = seekVolume;
    };
    progress.oninput = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      let current_minutes = Math.floor(seekTime / 60);
      let current_seconds = Math.floor(seekTime - current_minutes * 60);
      if (current_minutes < 10) {
        current_minutes = `0${current_minutes}`;
      }
      if (current_seconds < 10) {
        current_seconds = `0${current_seconds}`;
      }
      timeCurrent.innerText = `${current_minutes}:${current_seconds}`;
    };
    nextBtn.onclick = function () {
      if (!isNaN(_this.isNextSong)) {
        _this.nextSong(_this.isNextSong);
        _this.isNextSong = undefined;
      }
      audio.pause();
      setTimeout(() => {
        _this.isRandom ? _this.playRandomSong() : _this.nextSong();
        _this.render();
        setTimeout(() => {
          audio.play();
        }, 400);
      }, 700);
    };

    prevBtn.onclick = function () {
      audio.pause();
      setTimeout(() => {
        if (!isNaN(_this.isNextSong) && !_this.isRandom) {
          _this.nextSong(_this.isNextSong);
          _this.isNextSong = undefined;
          _this.render();
          setTimeout(() => {
            audio.play();
          }, 400);
        } else {
          _this.isRandom ? _this.playRandomSong() : _this.prevSong();
          _this.render();
          setTimeout(() => {
            audio.play();
          }, 400);
        }
      }, 700);
    };
    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };
    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
      randomBtn.classList.toggle("active", _this.isRandom);
    };
    audio.onended = function () {
      setTimeout(function () {
        if (!isNaN(_this.isNextSong)) {
          _this.nextSong(_this.isNextSong);
          _this.isNextSong = undefined;
        }
        if (_this.isAutoNextSong) {
          _this.isRepeat ? audio.play() : _this.nextSong();
          setTimeout(() => {
            _this.render();
            audio.play();
          }, 300);
        } else {
          audio.pause();
        }
      }, 1000);
    };
    autoNextSongBtn.onclick = (e) => {
      _this.isAutoNextSong = !_this.isAutoNextSong;
      autoNextSongBtn.classList.toggle("active", _this.isAutoNextSong);
      getNextSongSpan = $(".autonext-span");
      _this.isAutoNextSong
        ? (getNextSongSpan.innerText = "Tự động chuyển bài: Bật")
        : (getNextSongSpan.innerText = "Tự động chuyển bài: Tắt");
    };

    listBtn.onclick = function () {
      _this.isListShow = !_this.isListShow;
      listBtn.classList.toggle("active", _this.isListShow);
      playerList.classList.toggle("show", _this.isListShow);
      playerList.classList.toggle("hide", !_this.isListShow);
    };
    tabPlaylists.forEach((btn) => {
      btn.onclick = (e) => {
        optionControl(e);
      };
    });
    // ------------------------------
    optionControl = function (e) {
      deleteThisSong = function (lists, btn, index, list2) {
        btn.onclick = (e) => {
          option.parentElement.classList.add("disable");
          audio.pause();
          setTimeout(() => {
            if (list2) {
              list2.map((song, inx) => {
                if (index == inx) {
                  song.favorite = false;
                }
              });
            }

            lists.map((song, inx) => {
              if (index == inx) {
                lists.splice(inx, 1);
                return _this.delList.unshift({
                  name: song.name,
                  singer: song.singer,
                  path: song.path,
                  image: song.image,
                  disableSong: true,
                  lastIndex: index,
                });
              }
            });
            _this.loadCurrentSong();
            _this.render();
          }, 300);
        };
      };
      const songNode = e.target.closest(".song:not(.active)");
      var option = e.target.closest(".option");
      if (songNode || option) {
        if (songNode && !option) {
          if (songNode.dataset.index == _this.isNextSong) {
            _this.isNextSong = undefined;
          } else {
            _this.currentIndex = Number(songNode.dataset.index);
            _this.render();
            audio.pause();
            setTimeout(() => {
              _this.loadCurrentSong();
              setTimeout(() => {
                audio.play();
              }, 500);
            }, 1000);
          }
        }
        if (option) {
          const getDeleteBtn = $$(".delete-btn");
          const getFavSongDelBtn = $$(".fav-delete-btn");
          const getNextSong = $$(".nextsong-btn");
          const getFavSong = $$(".favsong-btn");
          const getDelFavSong = $$(".del-favsong-btn");
          const getReDelBtn = $$(".re-delete-btn");
          getReDelBtn.forEach((btn, inx) => {
            btn.onclick = (e) => {
              _this.delList.map((song, index) => {
                if (inx == index) {
                  _this.songs.push({
                    name: song.name,
                    singer: song.singer,
                    path: song.path,
                    image: song.image,
                    favorite: false,
                    disableSong: false,
                  });
                  _this.delList.splice(index, 1);
                }
              });
              _this.render();
            };
          });
          getDelFavSong.forEach((btn, inx) => {
            btn.onclick = (e) => {
              _this.songs.map((song, index) => {
                song.favorite = false;
              });
              _this.favLists.map((song, index) => {
                if (inx == index) {
                  return _this.favLists.splice(index, 1);
                }
              });
              _this.render();
            };
          });
          // const getDelList = $$(".dellist");
          getFavSong.forEach((btn, inx) => {
            btn.onclick = (e) => {
              _this.songs.map((song, index) => {
                if (inx == index) {
                  song.favorite = true;
                  return _this.favLists.push({
                    name: song.name,
                    singer: song.singer,
                    path: song.path,
                    image: song.image,
                    lastIndex: index,
                    favorite: true,
                  });
                }
              });
              _this.render();
            };
          });
          getNextSong.forEach((btn, index) => {
            _this.nextSongBtn(btn, index);
          });
          getFavSongDelBtn.forEach((btn, index) => {
            this.deleteThisSong(_this.favLists, btn, index, _this.songs);
          });
          getDeleteBtn.forEach((btn, index) => {
            this.deleteThisSong(_this.songs, btn, index);
          });
          _this.isOpenOption = !_this.isOpenOption;
          _this.isOpenOption
            ? option.classList.add("active")
            : option.classList.remove("active");
        }
      } else {
        _this.isPlaying ? audio.pause() : audio.play();
      }
    };
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    headingSinger.textContent = this.currentSong.singer;
    cdThumb.style.backgroundImage = `url("${this.currentSong.image}")`;
    cdThumbRigh.style.backgroundImage = `url("${this.currentSong.image}")`;
    audio.src = this.currentSong.path;
  },
  nextSongBtn: function (button, idx) {
    button.onclick = () => {
      if (idx === this.isNextSong) {
        this.isNextSong = undefined;
        this.render();
      } else {
        this.isNextSong = idx;
        this.render();
      }
    };
  },
  deleteSong: function (button, idx) {
    button.onclick = () => {
      let time = 300;
      audio.pause();
      setTimeout(() => {
        this.songs.splice(idx, 1);
        this.loadCurrentSong();
        this.render();
      }, time);
    };
  },
  nextSong: function (value) {
    if (!isNaN(value)) {
      if (this.currentIndex >= 0) {
        this.currentIndex = value - 1;
      } else {
        this.currentIndex = value + 1;
      }

      this.loadCurrentSong();
    } else {
      this.currentIndex++;
      if (this.currentIndex >= this.songs.length) {
        this.currentIndex = 0;
      }
      this.loadCurrentSong();
    }
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  start: function () {
    this.defineProperties();
    this.handleEvent();
    this.loadCurrentSong();
    this.render();
  },
};
app.start();
