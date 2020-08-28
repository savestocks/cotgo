Vue.component('purchase-component', {
	name: 'purchase-component',
	template: `
	<div class="form">
		<div class="row">
			<div class="col-12">
				<span class="form_title">{{item.name}}</span>
			</div>
		</div>
		<div class="form_inputs row">
			<div class="col-3 label">
				Price:
			</div>
			<div class="col-8 ">
				<input v-model.number="model.price" type="number" />
			</div>
			<div class="col-3 label ">
				Quantity:
			</div>
			<div class="col-8 ">
				<input  v-model.number="model.qtd" type="number"/>
			</div>
			<div class="col-3 label ">
				Market:
			</div>
			<div class="col-8 ">
				<select v-model="model.market" >
					<option v-for="m in markets">{{m}}</option>
				</select>
			</div>

		</div>
		<div style="color:red" clss="row">
			*Price should be integer. Example 1.00 = 100
		</div>
		<div class="row">
			<div class="col-6 ">
				<button type="button" class="btn  prices btn_cancel btn-secondary" @click="cancel" >Cancelar</button>
			</div>
			<div class="col-6 ">
				<button type="button" class="btn  prices btn_new btn-primary" @click="save" >Salvar</button>
			</div>
		</div>
	</div>    
	`,
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
			markets: ["Lidl","Continente","Pingo Doce","Minipreco","E'leclerc","Intermache","BP","Decathlon","Outro"]
		}
	},
	
	methods: {
		cancel: function(){
			this.$emit("oncancel");
		},
		save: function(){
			let me = this;
			axios.post('/purchases/'+this.item.id + getKey(), this.model).then(function(res){
				me.$emit("onsuccess",res.data);
			}).catch(function(err){
				me.$emit("onerror");
			});
		}
	}
});
