<template>
        <div class="count">
            <h2>{{msg}}</h2>
            <hr/>
            <h3>{{$store.state.count}}</h3>

          <div>
	        <button @click="$store.commit('add2',10)">+</button>
	        <button @click="$store.commit('reduce',4)">-</button>
	      </div>
	       <label class="col-sm-2 control-label">用户名</label>
	        <div class="col-sm-10 ab">
	            <input type="text"  v-model="username" v-on:change="userNameChange" class="form-control" :placeholder="username">
	             <button type="button" v-on:click="submit" class="btn btn-info">提交</button>
	        </div>
           <product></product>
           <cart></cart>
           <info></info>
        </div>
</template>
<script>
import product from './Product.vue'; //商品的列表组件
import cart from './Cart.vue'; //已选商品的组件
import info from './Info'; //总数量价格的组件
export default{
	 props:["placeholder"],
     components: {
        product,        
        cart,
        info
      },
     data(){
        return{
            msg:'Hello Vuex',
            username:"1234"
        }
    },
    methods:{
    	userNameChange(){
              this.$store.state.user_name = this.username;
        },
        submit(){
               this.$store.commit("showUserName");
            }
     },
    computed:{
        count(){
            return this.$store.state.count;
        }
    }

}
</script>
<style> 
.count{height:800px;}
.ab{height:40px;}
.form-control{float:left;width:300px;}
.btn{height:35px;margin-left:10px;}
.count{margin-top:49px;}
button{width:50px;height:30px;font-size:20px;color:red;}
.table-shop > th {
  text-align: center;
}

.item-wrapper {
  display: flex;
  background-color: #dfdfdf;
  align-items: center;
  justify-content: center;
}

.item {
  flex: 1;
}
</style>