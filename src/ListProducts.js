import React, {Component} from 'react';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import { createApolloFetch } from 'apollo-fetch';

export default class ListProducts extends Component {
    constructor(props){
        super(props)

        this.state = {}
    }

    getRating = (e, id) => {
        e.preventDefault();
        const value = e.target.newItem.value

        const uri = '//188.116.11.87/graphql';

        const variables = {
            product_id: id,
            value: value,
            name: "wq",
            phone: "601654654",
            email: "goto@gmail.com",
            content: "some content"
        };
     
        // It should be possible to allow query to look graphql-like, however to shorten doing time I changed it like this
        const query = `
        mutation{rating(group_id: 3, product_id: ${variables.product_id}, value: ${variables.value}, name:"${variables.name}", phone: "${variables.phone}", email: "${variables.email}", content:"${variables.content}"){product_id, value}}`;
   
        const apolloFetch = createApolloFetch({ uri });

        //Should be used to initialize headers, not sure yet how to do it
        apolloFetch.use(({ request, options }, next) => {
            if (!options.headers) {
            options.headers = {};
            }
            next();
        });
        // after fetching, display rating according to the user input
        apolloFetch({ query, variables }).then(res =>{
            this.props.setRating(id, value);
        });   
    }  

    renderList = () => {
        const products = this.props.products;
        const list = products.map (product => {
            const { id, name, description, author, is_published, keywords } = product
            return (
                <div key={(function(){return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);}()) } className="productsList">
                    {id && <strong>Id:</strong> } {id}
                    {name && <strong> <br/> Name:</strong>} {name}
                    {description && <strong> <br/> Description:</strong> } {description}
                    {author &&      <strong> <br/> Author</strong> } {author}
                    {is_published && <strong> <br/> is_published</strong> } {is_published} 
                    {keywords.length > 1 && <strong> <br/> keywords</strong> } {keywords}
                    {<strong> <br/> Your rating: </strong>}
                    <strong>{product.rating}</strong>

                    <form className="form-inline" onSubmit={(e) => {this.getRating(e, id)}}>
                    <div className="form-group">
                        <label className="sr-only" htmlFor="newItemInput">Add New Item</label>
                        <input ref={input => this.newItem = input} type="number"min="1" max="5" placeholder="Type stars from 1 to 5" className="form-control" id="newItem"></input>
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