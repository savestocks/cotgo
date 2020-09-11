Vue.component('item-component', {
	name: 'item-component',
	template: `
    <div class="form">
        <div class="row">
            <div class="col-12">
                <span class="form_title">Fill new items details</span>
            </div>
        </div>
        <div class="form_inputs row">
            <div class="col-3 label">
                Initial:
            </div>
            <div class="col-8 ">
                <input v-model="model.initial" maxlength="5" />
            </div>
            <div class="col-3 label ">
                Name:
            </div>
            <div class="col-8 ">
                <input  v-model.name="model.name" />
            </div>
            <div class="col-3 label ">
                Group:
            </div>
            <div class="col-8 ">
                <select v-model="model.groupId" >
                    <option v-for="g in groups" :value="g.id">{{g.name}}</option>
                </select>
            </div>
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
		previousGroup: "",
		groups: {default:[]}
	},

	data: function(){
		return {
			model:{
				initial:"",
				name:"",
				groupId: "",				
			}
		}
	},
	created: function(){
		if(this.previousGroup != "Todos" ){
			this.model.groupId = this.previousGroup.id;
		}else{
            let sup = this.groups.filter(function(it){ return it.name === 'Supermercado'})[0];
            this.model.groupId = sup ? sup.id : null;
        }
	},
	methods: {
		cancel: function(){
			this.$emit("oncancel");
		},
		save: function(){
			let me = this;
			axios.post('/create' + getKey(), this.model).then(function(res){
				me.$emit("onsuccess",res.data);
			}).catch(function(err){
				me.$emit("onerror");
			});
		}
	}
});