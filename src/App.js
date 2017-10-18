import React, { Component } from 'react';
import ListProducts from './ListProducts.js'

import './App.css';

class App extends Component {
  constructor(){
    super();

   this.state = {
      products:[],
      isLoaded:false
    } 
  }
  getData = () => {
    const url = 'http://188.116.11.87/graphql?query=%23%20Welcome%20to%20GraphiQL%0A%23%0A%23%20GraphiQL%20is%20an%20in-browser%20IDE%20for%20writing%2C%20validating%2C%20and%0A%23%20testing%20GraphQL%20queries.%0A%23%0A%23%20Type%20queries%20into%20this%20side%20of%20the%20screen%2C%20and%20you%20will%0A%23%20see%20intelligent%20typeaheads%20aware%20of%20the%20current%20GraphQL%20type%20schema%20and%0A%23%20live%20syntax%20and%20validation%20errors%20highlighted%20within%20the%20text.%0A%23%0A%23%20To%20bring%20up%20the%20auto-complete%20at%20any%20point%2C%20just%20press%20Ctrl-Space.%0A%23%0A%23%20Press%20the%20run%20button%20above%2C%20or%20Cmd-Enter%20to%20execute%20the%20query%2C%20and%20the%20result%0A%23%20will%20appear%20in%20the%20pane%20to%20the%20right.%0A%0A%0Aquery%7B%0A%20%20product%7B%0A%20%20%20%20id%0A%20%20%20%20name%0A%20%20%20%20description%0A%20%20%20%20keywords%0A%20%20%20%20is_published%0A%20%20%20%20author%0A%20%20%20%20attributes%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20basket%20%7B%0A%20%20%20%20id%0A%20%20%7D%0A%20%20post%20%7B%0A%20%20%20%20id%0A%20%20%20%20publication_date%0A%20%20%7D%0A%20%23%20last_comments(data%3A%226%22)%0A%20%20%0A%7D%0A%0A'
    return fetch(url).then(function(response){
      return response.json();
    }).then((data) => {
     
     data.data.product.map(singleproduct => {

       // destructuring singleproduct array for later brevity
      let { id, name, description, author, is_published, keywords } = singleproduct;

      const products = this.state.products;

      // deep copying data gathered
      let copiedData = JSON.parse(JSON.stringify(singleproduct));
      products.push(copiedData);
 
      // updating products according to fetched data
      this.setState({
        products
      })
     })

     this.setState({
       isLoaded:true
     })

    })
  }

  componentDidMount() {
    this.getData();

  }

  render() {
    return (
      <div className="App">
        {this.state.isLoaded && <ListProducts 
          products = {this.state.products}
        />
        }
      </div>
    );
  }
}

export default App;