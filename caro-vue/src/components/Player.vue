<template>
  <div class="player col-lg-3 col-6">
    <h3 v-if="turn === playerId" class="highlight" :id="playerId + '-name'">{{ name }}</h3>
    <h3 v-else :id="playerId + '-name'">{{ name }}</h3>
    <q-btn-toggle
        v-model="model"
        spread
        no-caps
        text-color="black"
        :options="[
          {label: 'Tiles', value: 'one'},
          {label: 'Scoring rules', value: 'two'}
        ]"
        @click="changeTab()"
    />
    <div class="tab-content tab-pane" :id="'nav-tabContent-' + playerId">
      <div v-show="tile" class="top-padding tab-pane fade show active" :id="'nav-tiles-' + playerId"
           :aria-labelledby="'nav-tiles-tab-' + playerId">
        <h4 :id="playerId + '-points'">{{ points }}</h4>
        <div v-for="(count, color) in tiles" class="tile-padding">
          <TileList class="player" :color="color" :count="count" :player="playerId"></TileList>
        </div>
      </div>
      <div v-show="rules" class="top-padding tab-pane fade show active tab">
        <QuickRules :player="playerId"></QuickRules>
      </div>
    </div>
  </div>
</template>

<script>
import TileList from "./TileList.vue";
import QuickRules from "./QuickRules.vue";
import {ref} from 'vue';

export default {
  data() {
    return {
      tile: true,
      rules: false
    }
  },
  methods: {
    changeTab() {
      this.tile = !this.tile;
      this.rules = !this.rules;
    }
  },
  name: 'Player',
  components: {QuickRules, TileList},
  props: ['name', 'points', 'tiles', 'moves', 'playerId', 'turn'],
  setup() {
    return {
      tab: ref('mails')
    }
  }
}
</script>

<style>

.tile-padding {
  padding: 5px;
}

.top-padding {
  padding-top: 50px;
}

.grey-link.nav-link {
  background: rgba(0, 0, 0, 0);
  color: #4e5965;
}

.grey-link.nav-link:hover {
  color: whitesmoke;
}

.highlight {
  text-shadow: 3px 3px 5px #A0A0A0;
}

.player {
  align-content: center;
  position: relative;
}

.player .q-btn-toggle {
  padding-top: 0;
}

.tab {
  background: rgba(0, 0, 0, 0);
}

:deep(*) {
  background-color: unset;
}

</style>