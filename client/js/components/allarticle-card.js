Vue.component('allarticle-card', {
    props: ['allarticle'],
    data() {
        return {
            fbSharelink: `https://www.facebook.com/sharer/sharer.php?u=`,
            fblast: `&amp;src=sdkpreparse%2F&amp;src=sdkpreparse`,
        }
    },
    methods: {
        comingSoon() {
            Swal.fire({
                position: 'top-end',
                type: 'info',
                title: 'This feature is coming soon ^_^',
                showConfirmButton: false,
                timer: 1500
              })
        },
        shareFacebook(input) {
            // console.log("share artikel by FB", `${this.fbSharelink}${baseURL}/articles/${input}${this.fblast}`)
            return `${this.fbSharelink}${baseURL}/articles/${input}${this.fblast}`
        },
    },
    created() {
        console.log('allarticle card is created')
    },
    template: `
    <div>
            <!--/stories-->
        <div class="row rounded border-success" style="background: rgba(105,105,105, 0.8)">    
            <br>
            <div class="col-md-2 col-sm-3 text-center" >
                <a class="story-img" href="#">
                    <img v-if="allarticle.featured_image" :src="allarticle.featured_image" style="width:120px;height:120px; padding-top: 20px" class="rounded-circle">
                    <img v-if="!allarticle.featured_image" src="./assets/no_img.jpg" style="width:120px;height:120px; padding-top: 20px" class="rounded-circle">
                </a>
            </div>
            <div class="col-md-10 col-sm-9" style="color:white">
                <h3>{{allarticle.title}}</h3>
                <div class="row">
                    <div class="col-sm-12">
                        <p v-html="allarticle.content"> </p>
                        <p> Author: {{allarticle.author.email}} </p>
                        <h6 class="float-right ">Tags: <span class="badge badge-success mr-1" v-for="singletag in allarticle.tags"> {{singletag}}</span></h6>
                        <ul class="list-inline">
                            <li class="list-inline-item"><a href="#" style="color:white">2 Days Ago</a></li>
                            <li class="list-inline-item"><a href="#" style="color:white" v-on:click="comingSoon"><i class="far fa-comment"></i> 4 Comments</a></li>
                            <li class="list-inline-item"><a target="_blank" :href="shareFacebook(allarticle._id)" class="fb-xfbml-parse-ignore" style="color:white"><i class="fas fa-share-square"></i> FB Shares</a></li>
                        </ul>
                    </div>
                </div>
                <br><br>
            </div>
        </div>
        <hr style="background-color:white; height: 2px;">   
        <!--/stories-->
    </div>
    `
})