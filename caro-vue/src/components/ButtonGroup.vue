<template>
  <div class="col-lg-6 col-12 order-first order-lg-0 col-board">
    <div v-for="row in 15" >
      <span v-for="col in 15" class="q-btn-group shadow-none" >
        <DropdownTest/>
      </span>
    </div>
  </div>
</template>

<script>
import DropdownTest from "@/components/DropdownTest.vue";
export default {
  name: "ButtonGroup",
  components: {DropdownTest},
  methods: {
    getNumbers: function (start, stop) {
      return new Array(stop - start).fill(start).map((n, i) => n + i);
    }
  },
}
</script>

<style scoped>

.button-padding {
  padding: 20px;
}

.col-board {
  flex: 0 0 50%;
  padding: 1em;
}

.shadow-none {
  box-shadow: none;
  padding: 0px !important;
}

</style>