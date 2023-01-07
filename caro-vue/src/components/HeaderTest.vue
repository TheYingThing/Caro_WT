<template>
    <div class="q-pa-md">
        <q-header elevated class="header-background">
          <q-toolbar>
            <q-toolbar-title class="toolbar-title">Caro</q-toolbar-title>
            <q-btn class="toolbar-button">
              <RouterLink class="nav-link" aria-current="page" to="/">Menu</RouterLink>
            </q-btn>
            <q-btn>
              <RouterLink class="nav-link" to="/game">Game</RouterLink>
            </q-btn>
            <q-btn>
              <RouterLink class="nav-link" to="/rules">Rules</RouterLink>
            </q-btn>
          </q-toolbar>
        </q-header>
    </div>
</template>

<script>
export default {
  name: "HeaderTest"
}
</script>

<style scoped>

.header-background {
  background: #21262b;
}
:deep(*) {
  background-color: unset;
}

:deep(row) {
  width: unset;
}

.toolbar-title {
  font-size: x-large;
  padding-left: 10px;
}

:deep(.q-toolbar__title:first-child) {
  padding-left: 2rem;
  padding-right: 4rem;
}

.toolbar-button {
  align-items: revert;
}

</style>