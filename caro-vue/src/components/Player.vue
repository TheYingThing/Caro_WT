<template>
  <div class="player col-lg-3 col-6">
    <h3 v-if="turn === playerId" class="highlight" :id="playerId + '-name'">{{ name }}</h3>
    <h3 v-else :id="playerId + '-name'">{{ name }}</h3>
    <nav class="top-padding">
      <div class="nav nav-pills nav-justified" id="nav-tab" role="tablist">
        <button class="nav-link grey-link active" :id="'nav-tiles-tab-' + playerId" data-bs-toggle="tab"
                :data-bs-target="'#nav-tiles-' + playerId" type="button" role="tab"
                :aria-controls="'nav-tiles-' + playerId"
                aria-selected="true">
          Tiles
        </button>
        <button class="nav-link grey-link" :id="'nav-scoring-tab'+ playerId" data-bs-toggle="tab"
                :data-bs-target="'#nav-scoring-' + playerId" type="button" role="tab"
                :aria-controls="'nav-scoring-' + playerId"
                aria-selected="false">
          Scoring rules
        </button>
      </div>
    </nav>
    <div class="tab-content" :id="'nav-tabContent-' + playerId">
      <div class="tab-pane fade show active top-padding" :id="'nav-tiles-' + playerId" role="tabpanel"
           :aria-labelledby="'nav-tiles-tab-' + playerId">
        <h4 :id="playerId + '-points'">{{ points }}</h4>
        <div v-for="(count, color) in tiles" class="tile-padding">
          <TileList class="player" :color="color" :count="count" :player="playerId"></TileList>
        </div>
      </div>
      <Quickrules :player="playerId"></Quickrules>
    </div>
  </div>
</template>

<script>
import TileList from "./TileList.vue";
import Quickrules from "./Quickrules.vue";

export default {
  name: 'Player',
  components: {Quickrules, TileList},
  props: ['name', 'points', 'tiles', 'moves', 'playerId', 'turn'],
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
}

</style>