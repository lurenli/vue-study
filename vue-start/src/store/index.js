import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export const store = new Vuex.Store({
    state : {
        count:0,
        user_name:"小米",
        countNum:1,
        shop_list: [{
            id: 11,
            name: '鱼香肉丝',
            price: 12,
          }, {
            id: 22,
            name: '宫保鸡丁',
            price: 14
          }, {
            id: 34,
            name: '土豆丝',
            price: 10
          }, {
            id: 47,
            name: '米饭',
            price: 2
      }],
      //添加到购物车的商品
      added:[]
    },
    getters:{
         //商品列表
        shoplist:state => state.shop_list,
        //购物车的列表
        cartProducts:state=>{
            return state.added.map(({id,num})=>{
                let product = state.shop_list.find(n=>n.id == id)
//find()方法用于找出第一个符合条件的数组成员，他的参数是一个回调函数，所有数组成员一次执行这个回调函数，知道找出第一个返回值为true的成员，然后返回该成员，如果没有符合条件的成员，就返回undefined
                return {
                    ...product,
                    num
                }
            })
        },
        //计算总价
        totalPrice:(state,getters)=>{
            let total = 0;
            getters.cartProducts.forEach(n=>{
                total += n.price * n.num
            })
            return total;
        },
        //计算总数量
        totalNum:(state,getters)=>{
            let total = 0;
            getters.cartProducts.forEach(n=>{
                total += n.num
            })
            return total;
        }
	},
    mutations :{
       add2(state,n){
            state.count+=n;
        },
        reduce(state,n){
            state.count-=n;
            if(state.count<=0){
            	state.count = 0
            }
        },
        showUserName(state){
            alert(state.user_name);
        },
         //添加到购物车操作
        add(state,{id}){
            let record = state.added.find(n=>n.id == id);
//find()方法用于找出第一个符合条件的数组成员，他的参数是一个回调函数，所有数组成员一次执行这个回调函数，知道找出第一个返回值为true的成员，然后返回该成员，如果没有符合条件的成员，就返回undefined
            if(!record){
                state.added.push({
                    id,
                    num:1
                })

            }else {
                record.num++
            }

        },
        //清除购物车
        clearAll(state){
            state.added = []
        },
        //删除购物车的指定的商品
        del(state,product){
            state.added.forEach((n,i)=>{
                if(n.id == product.id){
                    //找到index的下标值
                    state.added.splice(i,1)
                }
            })
        },
    },
    actions:{
    	//添加到购物车操作
//action 和mutions 的定义方法是类似的，我们要dispatch 一个action, 所以actions 肯定有一个名字，dispatch action 之后它要做事情，就是commit mutation, 所以还要给它指定一个函数。因为要commit mutation ,所以 函数也会自动获得一个默认参数context,  它是一个store 实例，通过它可以获取到store 实例的属性和方法,如 context.state 就会获取到 state 属性， context.commit 就会执行commit命令。
//其实actions 还可以简写一下， 因为函数的参数是一个对象，函数中用的是对象中一个方法，我们可以通过对象的解构赋值直接获取到该方法。修改一下 actions
               
        /*addToCart(context,product){
           context.commit('add',{
                id:product.id
            });
        },*/

        //下面这个形式是简写,省略了自带参数 context  con
        addToCart({commit},product){
            commit('add',{
                id:product.id
            })
        },
        //清除购物车
        clearAllCart({commit}){
            commit('clearAll')
        },
        //删除购物车的指定的商品
        delProduct({commit},product){
            commit('del',product)
        },
    }
});
