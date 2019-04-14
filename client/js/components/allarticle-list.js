Vue.component('allarticle-list', {
    props: ['allarticleList'],
    created() {
        console.log('allarticlelist is created', this.allarticleList)
    },

    template: `
    <div>            
        <allarticle-card
            v-for="allarticledetail in allarticleList"
            v-bind:allarticle="allarticledetail"
            v-on:allarticledetail-request="$emit('allarticledetail-request1', allarticle)">
        </allarticle-card>
    </div>
    `
})