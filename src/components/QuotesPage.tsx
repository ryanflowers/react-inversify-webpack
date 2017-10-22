import * as React from "react";
import {QuotesList} from "./QuotesList";
import {QuoteForm} from "./QuoteForm";
import { IQuote } from "./Quotes.interfaces";
import * as _ from "lodash";

export interface IQuotesPageState { quotes: IQuote[]; }

export class QuotesPage extends React.Component<undefined, IQuotesPageState> {
    constructor() {
        super();

        this.onAddQuote = this.onAddQuote.bind(this);
        this.onDeleteQuote = this.onDeleteQuote.bind(this);
    }

    public render() {
        const style = {
            width: '100%'
        };

        if(!this.state) {
            return <QuoteForm onAddQuote={this.onAddQuote}></QuoteForm>
        } else {
            return <div>
                        <QuoteForm onAddQuote={this.onAddQuote}></QuoteForm>
                        <hr style={style}/>
                        <QuotesList quotes={this.state.quotes} onDeleteQuote={this.onDeleteQuote}/>
                    </div>
        }
    }

    public componentDidMount() {
        let myInit = { method: 'GET',
            cache: 'no-cache' };

        let url = 'http://inversify-express-mongo.us-west-1.elasticbeanstalk.com/quotes';
        //let url = 'http://localhost:3000/quotes';
        fetch(url, (myInit as any))
            .then((resp) => resp.json()) // Transform the data into json
            .then((data: IQuote[]) => {
                this.setState({ quotes: data });
            });
    }

    private onAddQuote(quote: IQuote) {
        let clientId = this.guid();

        fetch('http://localhost:3000/quotes', {
            method: "POST",
            body: JSON.stringify(quote),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response: Response) => {
            let index = _.findIndex(this.state.quotes, (value: IQuote) => {
                return value._id === clientId;
            });

            if(index > -1) {
                let quotes = this.state.quotes;
                response.json().then((data: any) => {
                    quotes[index]._id = data._id;
                    this.setState({ quotes: quotes});
                });
            }
        }).catch((error: any) => {
            alert(`Error adding quote. Error:${error}`);
            this.setState({ quotes: _.filter(this.state.quotes, {_id: clientId})});
        });

        quote._id = clientId;
        // Add client lie
        this.setState({ quotes: this.state.quotes.concat(quote) });
    }

    private onDeleteQuote(quote: IQuote) {
        let url = 'http://localhost:3000/quotes?id=' + quote._id;

        fetch(url, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response: Response) => {

            let quotes = this.state.quotes.filter((value: IQuote) => {
                return value._id !== quote._id;
            });

            this.setState({ quotes: quotes});

        }).catch((error: any) => {
            alert(`Error deleting quote. Error:${error}`);
        });
    }

    private guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
}