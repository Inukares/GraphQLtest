import React, {Component} from 'react';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import { createApolloFetch } from 'apollo-fetch';

export default class ListProducts extends Component {
    constructor(props){
        super(props)

        this.state = {} // Will probably add message on failed fetch.
    }

    getRating = (e, id) => {
        e.preventDefault();
        const value = parseInt(e.target.newItem.value)
      //  value = parseInt(value); 
      if(value > 0 && value <= 5){
            this.setState({
                message:""
            })

            const uri = '//188.116.11.87/graphiql';
    
            const query = `
            mutation{
                rating(group_id: 3, product_id: $product_id, value: $value, name: $name, phone: $phone, email: $email, content:$content) {
                product_id,
                value,
                }
            }
            `;

            const variables = {
                product_id: id,
                value: value,
                name: "wq",
                phone: "601654654",
                email: "goto@gmail.com",
                content: "some content"
            };

            const apolloFetch = createApolloFetch({ uri });
            /*
            const header = `Access-Control-Allow-Credentials:true  
            Access-Control-Allow-Methods:POST, GET  
            Access-Control-Allow-Origin:http://localhost:3000  
            Access-Control-Expose-Headers:  
            Access-Control-Max-Age:1728000`
            */

            //Should be used to initialize headers, not sure yet how to do it
            apolloFetch.use(({ request, options }, next) => {
                if (!options.headers) {
                options.headers = {};  // Create the headers object if needed.
                console.log(options.headers);
                }
                options.headers['authorization'] = 'created token';
                options.headers['Acces-Control-Allow-Credentials'] = 'true';
                options.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000';
                options.headers['Access-Control-Max-Age:1728000`'] = '1728000';
            
                next();
            });
            // after fetching, display rating according to the user input
            apolloFetch({ query, variables }).then(res =>{
                console.log(res)
            });
        }else {
            this.setState({
                message:'Value must be a number from 1 to 5!'
            })
        }
    }  

    renderList = () => {
        const products = this.props.products;
        const list = products.map (product => {
            const { id, name, description, author, is_published, keywords } = product
            return (
                <div key={id} className="productsList">
                    {id && <strong>Id:</strong> } {id}
                    {name && <strong> <br/> Name:</strong>} {name}
                    {description && <strong> <br/> Description:</strong> } {description}
                    {author &&      <strong> <br/> Author</strong> } {author}
                    {is_published && <strong> <br/> is_published</strong> } {is_published} 
                    {keywords.length > 1 && <strong> <br/> keywords</strong> } {keywords}
                    {<strong> <br/> Your rating: </strong>}

                    <form className="form-inline" onSubmit={(e) => {this.getRating(e, id)}}>
                    <div className="form-group">
                        <label className="sr-only" htmlFor="newItemInput">Add New Item</label>
                        <input ref={input => this.newItem = input} type="text" placeholder="Type stars from 1 to 5" className="form-control" id="newItem"></input>
                    </div>
                    <Button type="submit" bsStyle="primary">Add</Button>
                    </form>
                    <em>{this.state.message}</em>
                </div>
            )
        })
        return <div>{list}</div>
    }

    render(){
        return(
            <div>
                <Grid>
                    <Row>
                        <Col lg={12}>
                        {this.renderList()}
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}