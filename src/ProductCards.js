import React from 'react';


class Card extends React.Component {
    render() {
        const rateOverallColor = (this.props.promo)? "text-danger" : "text-dark";
        const rate_overall = (this.props.promo)?this.props.promotion:this.props.rateOverall;
        return (
            <div className="col-md-6 col-lg-4 d-flex align-items-stretch">
                <div className="card mb-3">
                    <img className="card-img-top" src={this.props.img} alt={this.props.imgalt} />
                    <div className="card-body">
                        <h4 className="card-title">{this.props.book_title}</h4>
                        Rate: <strong className={rateOverallColor}>{rate_overall}</strong>
                        <p className="card-text">{this.props.last_page}</p>
                        <a className="btn btn-success text-white" onClick={()=>{this.props.showReadModal(this.props.ID,rate_overall)}}>Read</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default class CardContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            cards: []
        };
    }
    componentDidMount() {
        fetch(this.props.location)
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    cards: result
                });
            });
    }
    render() {
        const cards = this.state.cards;
        let items = cards.map(
            card => <Card key={card.id} {...card} promo={this.props.promo} showReadModal={this.props.showReadModal}/>
        );
        return (
            <div>
                <div className="mt-5 row">
                    {items}
                </div>
            </div>
        );
    }
}
