<template>
  <div id="app-container">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
  </div>
</template>

<style lang="scss">
body,
html {
  padding: 0;
  margin: 0;
}
#app-container {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
}

// config
$app_bg: #111;
$app_border: #1f1f1f;

.draw-layout {
  background: $app_bg;
  height: 100vh;
  display: grid;
  grid-template-columns: 48px auto 260px;
  grid-template-rows: 48px auto 25px;
  grid-template-areas: "logo navbar navbar" "toolbar main aside" "toolbar footer aside";
  .logo {
    grid-area: logo;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      color: #ffffff;
      font-weight: bold;
      font-size: 21px;
    }
  }
  .navbar {
    grid-area: navbar;
    background: $app_bg;
    border-bottom: 1px solid $app_border;
  }
  .toolbar {
    grid-area: toolbar;
    background: $app_bg;
    border-right: 1px solid $app_border;
  }
  .main {
    grid-area: main;
    background: $app_bg;
    padding: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: scroll;
    z-index: 0;
    .stage {
      transition: all 1s ease-in-out;
    }
  }
  .aside {
    grid-area: aside;
    background: $app_bg;
    border-left: 1px solid $app_border;
    padding: 0 10px;
    overflow-y: scroll;
    .layer-item {
      background: #171717;
      padding: 4px 8px;
      font-size: 12px;
      display: flex;
      align-items: space-between;
      color: #3f3f3f;
      margin-bottom: 4px;
      .layer-name {
        flex-grow: 1;
      }
      .option-icon {
        margin-left: 5px;
      }
    }
  }
  .footer {
    grid-area: footer;
    background: $app_bg;
    border-top: 1px solid $app_border;
    text-align: center;
    span {
      color: #555;
      font-size: 11px;
    }
  }
}
</style>
