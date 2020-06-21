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
		}
	},

	data: function(){
		return {
			model:{
				price:0,
				qtd:0
			}
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