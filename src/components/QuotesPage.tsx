import * as React from "react";
import {QuotesList} from "./QuotesList";
import {QuoteForm} from "./QuoteForm";
import { IQuote } from "./Quotes.interfaces";

export interface IQuotesPageState { quotes: IQuote[]; }

export class QuotesPage extends React.Component<undefined, IQuotesPageState> {
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
                        <QuotesList quotes={this.state.quotes}/>
                    </div>
        }
    }

    public componentDidMount() {
        var myInit = { method: 'GET',
            cache: 'no-cache' };

        //let url; = 'http://ryanflowers.us-west-1.elasticbeanstalk.com/quotes'
        let url = 'http://localhost:3000/quotes';
        fetch(url, (myInit as any))
            .then((resp) => resp.json()) // Transform the data into json
            .then((data: IQuote[]) => {
                this.setState({ quotes: data });
            });
    }

    private onAddQuote(quote: IQuote) {
        alert("Quote '" + quote.quote + "' Added! with author " + quote.author);
    }
}