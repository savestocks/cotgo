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

	methods: {
		cancel: function(){
			this.$emit("oncancel");
		},
		save: function(){
			alert("Salvo:" + this.item.id)
		}
	}
});