import React, { Component } from 'react';
import DrinkCard from './DrinkCard';
import Footer from './Footer';
import Header from './Header';
import Model from './Model'

class GinSeite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            model: { show: false, items: null }

        };
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }
    componentDidMount() {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                   /*  console.log(result) */
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    onSubmitForm = inputSearchValue => {
         console.log(inputSearchValue); 
        let path = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin"
        
        if(inputSearchValue) {
            path = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="+ inputSearchValue
        }

        fetch(path)
        .then(res => res.json())
        .then(
            (result) => {
                // console.log(result)
                  this.setState({
                    isLoaded: true,
                    items: result
                });   
            },
            (error) => {
                console.log(error)
                  this.setState({
                    isLoaded: true,
                    error
                }); 
            }
        )
  };

    toggleModel = (items) => {
       /*  console.log(items) */
        const modal = {show:false , items:null};
       /*  console.log(modal) */
        if (items){
            modal.show = true ;
            modal.items = {...items};
        }
             this.setState({model: modal})
     }
    render() {
        return (
            <div>
                {this.state.model.show && <Model
                    data={this.state.model.items}
                    toggle={this.toggleModel}
                />}
                <section className="GinSeite">
                    <Header 
                     onSubmitForm = {this.onSubmitForm}
                     />
                    <div className="gridContainer fadeIn">
                        {this.state.isLoaded ?
                            this.state.items.drinks.map(drinks => <DrinkCard
                                key={drinks.idDrink}
                                drinksData={drinks}
                                toggleModal={this.toggleModel}
                            />)
                            : <div>Loading ...</div>
                        }
                    </div>
                    <Footer />
                </section>
            </div>);
    }
}



export default GinSeite;

