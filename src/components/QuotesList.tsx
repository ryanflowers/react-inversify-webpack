import * as React from "react";
import { IQuote } from "./Quotes.interfaces";

export interface IQuotesListProps { quotes: IQuote[]; }

export class QuotesList extends React.Component<IQuotesListProps, undefined> {
    public render() {
        if(this.props) {
            const listItems = this.props.quotes.map((quote: IQuote) =>
                <li key={quote._id.toString()}>
                    <span>Author: {quote.author}</span>&nbsp;&nbsp;
                    <span>Quote: {quote.quote}</span>
                </li>
            );
            return <ul>{listItems}</ul>
        }
        else {
            return <div>No quotes found.</div>
        }

    }
}