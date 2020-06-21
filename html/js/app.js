new Vue({
    el:"#app",

    data: function(){
        return {
            items:[],
            itemSelected: null
        }
    },

    created: function(){
        this.loadItems();
    },

    computed: {
        creating: function(){
            return this.itemSelected != null;
        }
    },
    methods: {
        loadItems: function(){
            let me = this;
            axios.get(location.origin + '/list')
            .then(function(res){
                me.items = res.data;

            }).catch(function(err){
                console.error(err)
            });

            
        },
        newPurchase: function(item){
            this.itemSelected = item;
        },
        cancelNewPurchase: function(){
            this.itemSelected = null;
        },
        onSuccess: function(item){
            alert(item.id);
        },
        onError: function(){
            alert("Erro ao Salvar");
        }
    }
});