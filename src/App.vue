<template>
  <div id="app" :class="{ 'dark-mode': !mode }">
    <div class="bg-img">
      <div class="container">
        <div class="top">
          <div>
            <h1>TODO</h1>
          </div>
          <div @click="switchModes">
            <img v-if="mode" src="@/assets/icon-moon.svg" alt="dark-mode" />
            <img v-else src="@/assets/icon-sun.svg" alt="light-mode" />
          </div>
        </div>
        <div @click="checker" class="todo-container">
          <input class="input input-dark" v-model="inputVal" type="text" placeholder="Create a new todo..." @keydown="appendItems" />
          <div class="box" :class="{ 'dark-box': !mode }" v-show="shown">
            <div class="list all active-list" v-for="li in liItems" :key="li">
              <p class="title">{{ li }}</p>
              <div class="checker list-checker"></div>
            </div>
            <div class="bottom">
              <div>
                <p class="length">{{ items }} Items left</p>
              </div>
              <div class="desktop-only">
                <ul>
                  <li @click="showAll" :class="{ 'active-link': allColor }">All</li>
                  <li @click="hideCompleted" :class="{ 'active-link': activeColor }">Active</li>
                  <li @click="hideActive" :class="{ 'active-link': completedColor }">Completed</li>
                </ul>
              </div>
              <div @click="removeCompleted">
                <p class="clear">Clear Completed</p>
              </div>
            </div>
          </div>
          <div class="mobile-only">
            <ul>
              <li @click="showAll" :class="{ 'active-link': allColor }">All</li>
              <li @click="hideCompleted" :class="{ 'active-link': activeColor }">Active</li>
              <li @click="hideActive" :class="{ 'active-link': completedColor }">Completed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mainApp',
  data() {
    return {
      shown: false,
      inputVal: '',
      items: 0,
      liItems: [],
      allColor: false,
      activeColor: false,
      completedColor: false,
      mode: true,
    };
  },
  methods: {
    appendItems(e) {
      if (e.code === 'Enter') {
        this.shown = true;
        this.liItems.push(this.inputVal);
        this.inputVal = '';
        this.items++;
      }
    },

    checker(e) {
      if (e.target.classList.contains('checker')) {
        e.target.classList.toggle('completed');
        e.target.previousSibling.classList.toggle('completed-paragraph');
        const oldClass = e.target.parentElement.classList[2];
        const togglingClass = e.target.parentElement.classList.contains('active-list') ? 'completed-list' : 'active-list';
        e.target.parentElement.classList.replace(oldClass, togglingClass);
      }
    },

    showAll() {
      (this.allColor = true), (this.activeColor = false), (this.completedColor = false);
      document.querySelectorAll('.list').forEach((el) => {
        el.style.display = '';
      });

      this.items = document.querySelectorAll('.list').length;
    },

    hideActive() {
      this.completedColor = true;
      (this.allColor = false),
        (this.activeColor = false),
        document.querySelectorAll('.list').forEach((el) => {
          el.style.display = '';
          if (el.classList.contains('active-list')) {
            el.style.display = 'none';
          }
        });

      this.items = document.querySelectorAll('.completed-list').length;
    },

    hideCompleted() {
      (this.activeColor = true), (this.completedColor = false);
      (this.allColor = false),
        document.querySelectorAll('.list').forEach((el) => {
          el.style.display = '';
          if (el.classList.contains('completed-list')) {
            el.style.display = 'none';
          }
        });
      this.items = document.querySelectorAll('.active-list').length;
    },

    removeCompleted() {
      this.completedColor = false;
      (this.allColor = false),
        (this.activeColor = false),
        document.querySelectorAll('.completed-list').forEach((el) => {
          el.remove();
        });
    },
    switchModes(e) {
      if (e.target) {
        this.mode = !this.mode;
        this.mode ? (document.body.style.background = 'hsl(236, 33%, 92%)') : (document.body.style.background = 'hsl(235, 21%, 11%)');
      }
    },
  },
};
</script>

<style lang="scss">
@use 'assets/var';
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&display=swap');
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
}

ul {
  list-style: none;
}

#app {
  font-family: 'Josefin Sans', sans-serif;
}

.hide-el {
  display: none;
}

.active-link {
  color: var.$bright-blue;
  font-weight: bold;
}

.title {
  font-size: 19px;
  font-weight: 700;
  color: var.$very-dark-grayish-blue-secondary;
  -webkit-box-ordinal-group: 3;
      -ms-flex-order: 2;
          order: 2;
  -ms-flex-item-align: center;
      -ms-grid-row-align: center;
      align-self: center;
  margin-left: 15px;
  padding-top: 5px;
}

.completed-paragraph {
  position: relative;
  color: var.$dark-grayish-blue;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 14px;
    width: 100%;
    height: 2px;
    background: var.$light-grayish-blue;
  }
}

.bg-img {
  height: 50vh;
  background-image: url('./assets/bg-desktop-light.jpg');
  background-repeat: no-repeat;
}

.container {
  width: 40%;
  margin: auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
}

.top {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  margin-top: 25px;
  margin-bottom: 10px;
  img {
    cursor: pointer;
  }
}

.todo-container {
  input {
    width: 40vw;
    border: none;
    outline: none;
    padding: 20px 0 20px 20px;
    border-radius: 3.5px;
    font-size: 18px;
    &::-webkit-input-placeholder {
      font-size: 18px;
    }
    &::-moz-placeholder {
      font-size: 18px;
    }
    &:-ms-input-placeholder {
      font-size: 18px;
    }
    &::-ms-input-placeholder {
      font-size: 18px;
    }
    &::placeholder {
      font-size: 18px;
    }
  }
  .checker {
    width: 25px;
    height: 25px;
    border: 1px solid var.$dark-grayish-blue;
    border-radius: 50%;
    cursor: pointer;
  }
  .checker-position {
    -webkit-transform: translate(15px, 43px);
        -ms-transform: translate(15px, 43px);
            transform: translate(15px, 43px);
  }

  .completed {
    background: var.$check-background;
    border: none;
    position: relative;
    &::before {
      content: url('./assets/icon-check.svg');
      position: absolute;
      right: 7px;
      top: 5px;
    }
  }
}

.box {
  min-width: 30vw;
  background: hsl(0, 0%, 100%);
  margin-top: 20px;
  border-radius: 3.5px;
  padding: 20px 0;
  box-shadow: 8px 10px 17px -5px var.$dark-grayish-blue;
  -webkit-box-shadow: 8px 10px 17px -5px var.$dark-grayish-blue;
  -moz-box-shadow: 8px 10px 17px -5px var.$dark-grayish-blue;
  hr {
    margin: 15px 0;
  }
  .list {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 0 20px;
    margin-bottom: 35px;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 1px;
      background: var.$dark-grayish-blue;
      bottom: -15px;
      left: 0;
    }
    &-checker {
      -webkit-box-ordinal-group: 2;
          -ms-flex-order: 1;
              order: 1;
    }
  }
}

.bottom {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  padding: 0 15px;
  color: var.$dark-grayish-blue;
  ul {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    li {
      margin: 0 7px;
      cursor: pointer;
    }
  }

  .clear {
    cursor: pointer;
  }
}

.completed {
  background: var.$check-background;
  width: 25px;
  height: 25px;
  border: 1px solid var.$dark-grayish-blue;
  border-radius: 50%;
  cursor: pointer;
}

h1 {
  letter-spacing: 15px;
  font-weight: 700;
  color: var.$very-light-gray;
}

// Dark-mode starts from here

.dark-mode {
  background: var.$very-dark-blue;
  .input-dark {
    background: var.$very-dark-desaturated-blue;
    color: var.$dark-grayish-blue;
    &::-webkit-input-placeholder {
      color: var.$dark-grayish-blue;
    }
    &::-moz-placeholder {
      color: var.$dark-grayish-blue;
    }
    &:-ms-input-placeholder {
      color: var.$dark-grayish-blue;
    }
    &::-ms-input-placeholder {
      color: var.$dark-grayish-blue;
    }
    &::placeholder {
      color: var.$dark-grayish-blue;
    }
  }

  .dark-box {
    box-shadow: 8px 10px 17px -5px var.$very-dark-desaturated-blue;
    -webkit-box-shadow: 8px 10px 17px -5px var.$very-dark-desaturated-blue;
    -moz-box-shadow: 8px 10px 17px -5px var.$very-dark-desaturated-blue;
    background: var.$very-dark-desaturated-blue;
    .title {
      color: var.$dark-grayish-blue;
    }

    .list::before {
      background: var.$very-dark-desaturated-blue;
    }
    .completed-paragraph {
      color: var.$very-dark-grayish-blue-secondary;
    }
    .list::before {
      background: var.$very-dark-grayish-blue;
    }
  }
  .bg-img {
    background-image: url('./assets/bg-desktop-dark.jpg');
  }
  .mobile-only {
    background: var.$very-dark-desaturated-blue;
    color: var.$very-dark-grayish-blue-secondary;
    li {
      cursor: pointer;
    }
  }
}

// Dark-mode ends from here

// Responsive starts from here

.mobile-only {
  display: none;
  @media (max-width: 1140px) {
    display: block;
    background: hsl(0, 0%, 100%);
    max-width: 98%;
    margin: 20px auto;
    padding: 20px 0;
    border-radius: 5px;
    ul {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: space-evenly;
          -ms-flex-pack: space-evenly;
              justify-content: space-evenly;

      li {
        font-size: 17px;
        @media (max-width: 600px) {
          font-size: 14px;
        }
      }
    }
  }
}

.desktop-only {
  @media (max-width: 1140px) {
    display: none;
  }
}

.title,
.clear,
.length {
  @media (max-width: 900px) {
    font-size: 2.3vw;
  }

  @media (max-width: 600px) {
    font-size: 3vw;
    text-align: center;
  }
}

.todo-container {
  input::-webkit-input-placeholder {
    @media (max-width: 600px) {
      font-size: 14.5px;
    }
  }
  input::-moz-placeholder {
    @media (max-width: 600px) {
      font-size: 14.5px;
    }
  }
  input:-ms-input-placeholder {
    @media (max-width: 600px) {
      font-size: 14.5px;
    }
  }
  input::-ms-input-placeholder {
    @media (max-width: 600px) {
      font-size: 14.5px;
    }
  }
  input::placeholder {
    @media (max-width: 600px) {
      font-size: 14.5px;
    }
  }
}
</style>
