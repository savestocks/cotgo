function getKey(){
    return '?key=' + new URL(location.href).searchParams.get("key");
}
new Vue({
    el:"#app",

    data: function(){
        return {
            items:[],
            filteredItems:[],
            filterGroup:"Todos",
            itemSelected: null,
            creatingItem: false,
            groups: []
        }
    },

    created: function(){
        this.loadGroups();
        this.loadItems();
    },

    computed: {
        creatingPurchase: function(){
            return this.itemSelected != null;
        }
    },
    watch: {
        items: function(newVal){
            this.filter();
        },
        filterGroup: function(){
            this.filter();
        }
    },
    methods: {
        loadGroups: function(){
            let me = this;
            axios.get(getGroupsURL() + getKey())
            .then(function(res){
                me.groups = res.data;

            }).catch(function(err){
                console.error(err)
            });
            
        },
        loadItems: function(){
            this.itemSelected = null;
            this.creatingItem = false;
            let me = this;
            axios.get(location.origin + '/list' + getKey())
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
        filter: function(){
            let me = this;
            this.filteredItems = this.items.filter(function(it){
                return me.filterGroup == "Todos" || it.groupId == me.filterGroup.id;
            });

        }

    }
});