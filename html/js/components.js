Vue.component('line-component', {
	name: 'line-component',
	template: '#lineCmp',
    props: {
		item: {
			default:{}
		}
	},



	methods: {
		priceText: function(price){
			try{
				return (price/100).toFixed(2) + " €"
			}catch(e){
				return "0 €";
			}
		},
		clickNew: function(){
			this.$emit('new',this.item);
		}
	}
});


Vue.component('purchase-component', {
	name: 'purchase-component',
	template: '#purchaseCmp',
    props: {
		item: {
			default:{}
		},
		
	},

	data: function(){
		return {
			model:{
				price:0,
				qtd:0,
				market:""
			},
			markets: ["Lidl","Continente","Pingo Doce","Minipreco","E'leclerc","Intermache","BP","Outro"]
		}
	},
	
	methods: {
		cancel: function(){
			this.$emit("oncancel");
		},
		save: function(){
			let me = this;
			axios.post('/purchases/'+this.item.id, this.model).then(function(res){
				me.$emit("onsuccess",res.data);
			}).catch(function(err){
				me.$emit("onerror");
			});
		}
	}
});


Vue.component('item-component', {
	name: 'item-component',
	template: '#itemCmp',
    props: {
		item: {
			default:{}
		},
		previousGroup: "",
		groups: {default:[]}
	},

	data: function(){
		return {
			model:{
				initial:"",
				name:"",
				group: "Supermercado",				
			}
		}
	},
	created: function(){
		if(this.previousGroup != "Todos" ){
			this.model.group = this.previousGroup;
		}
	},
	methods: {
		cancel: function(){
			this.$emit("oncancel");
		},
		save: function(){
			let me = this;
			axios.post('/create', this.model).then(function(res){
				me.$emit("onsuccess",res.data);
			}).catch(function(err){
				me.$emit("onerror");
			});
		}
	}
});