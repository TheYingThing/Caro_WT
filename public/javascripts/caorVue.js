const app = new Vue.createApp({})

app.component('nameForm', {
    data() {
        return {
            count: 0
        }
    },
    template: `
        <div class="col-4 mx-auto">
            <form id="nameForm" @submit="startGame">
                <div class="padding-30">
                    <div class="form-group bottom-padding-30">
                        <label for="playerOneName">Player 1 Name</label>
                        <input type="text" class="form-control" id="playerOneName"  placeholder="Player 1">
                    </div>
                    <div class="form-group bottom-padding-30">
                        <label for="playerTwoName">Player 2 Name</label>
                        <input type="text" class="form-control" id="playerTwoName"  placeholder="Player 2">
                    </div>
                </div>
                <button type="submit" class="btn btn-secondary">Start Game</button>
            </form>
        </div>
    `
})

app.mount('#page-content')