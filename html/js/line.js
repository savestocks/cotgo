Vue.component('line-component', {
	name: 'line-component',
	template: `
	<div class="row line">
		<div class="col-3">
			<div class="row">
				{{item.initial}}    
			</div>
			<div class="row">
				{{item.name}}
			</div>
		</div>
		<div class="col-2 ">
			<button type="button" class="btn  prices red">{{priceText(item.highestPrice)}}</button>
		</div>
		<div class="col-2 ">
			<button type="button" class="btn  prices green">{{priceText(item.lowestPrice)}}</button>
		</div>
		<div class="col-2 ">
			<button type="button" class="btn  prices gray">{{priceText(item.lastPrice)}}</button>
		</div>
		<div class="col-2 ">
			<button type="button" class="btn  btn_new prices btn-primary" @click="clickNew">New</button>
		</div>
	</div>	
	`,
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


