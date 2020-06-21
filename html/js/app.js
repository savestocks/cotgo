new Vue({
    el:"#app",

    data: function(){
        return {
            items:[],
            itemSelected: null,
            creatingItem: false
        }
    },

    created: function(){
        this.loadItems();
    },

    computed: {
        creatingPurchase: function(){
            return this.itemSelected != null;
        }
    },
    methods: {
        loadItems: function(){
            this.itemSelected = null;
            this.creatingItem = false;
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
            alert("Salvo" + item.id);
            this.loadItems();
        },
        onError: function(){
            alert("Erro ao Salvar");
        },
        newItem: function(){
            this.creatingItem = true;
        },
        cancelNewItem: function(){
            this.creatingItem = false;
        },

    }
});