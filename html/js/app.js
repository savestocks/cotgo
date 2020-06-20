new Vue({
    el:"#app",

    data: function(){
        return {
            items:[],
            creating:false
        }
    },

    created: function(){
        this.loadItems();
    },

    methods: {
        loadItems: function(){
            let me = this;
            axios.get(location.origin + '/list')
            .then(function(res){
                console.warn(res)
                me.items = res.data;

            }).catch(function(err){
                console.error(err)
            });

            
        },
        newPurchase: function(id){
            console.warn(id);
            this.creating = true;
        }
    }
});