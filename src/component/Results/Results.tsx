import React, {Component, ReactNode} from 'react';
import styles from './Results.module.scss';

import Person from "../../model/Person";
import PersonCard from "../PersonCard/PersonCard";

import PeopleApiHttpMock from "../../service/PeopleApiHttpMock/PeopleApiHttpMock";

type Props = {
    personList :Person[],
    recordsPerPage :number,
    pagesNumber :number,
    currentPage :string,
    pageChangeHandler :(page :string) => void
    selectedPersonHandler :(person :Person) => void
};
type State = {};

export default class Results extends Component<Props, State> {
    public backend :PeopleApiHttpMock;
    public state: State;

    constructor(props: Props) {
        super(props);
        this.state = {};

        this.backend = new PeopleApiHttpMock();
    }

    render(): ReactNode {
        return (
            <div className={styles["Results"]}>
                <p className={styles["header"]}>Resultados</p>
                {
                    this.props.pagesNumber > 1 ?
                        <section className={styles["page-handler"]}>
                            <button className={`${styles["double-arrow-left-icon"]} ${styles["clickable"]} ${styles["to-silver"]}`} id="to-first-page"
                                    onClick={this.onButtonClickedHandler}><span>DT</span></button>
                            <button className={`${styles["arrow-left-icon"]} ${styles["clickable"]} ${styles["to-silver"]}`} id="to-previous-page"
                                    onClick={this.onButtonClickedHandler}><span>DT</span></button>

                            <div className={styles["page-from-total"]}>
                                <input type="number" value={this.props.currentPage} onChange={this.inputChangeHandler}/>
                                <span> / {this.props.pagesNumber.toString()}</span>
                            </div>

                            <button className={`${styles["arrow-right-icon"]} ${styles["clickable"]} ${styles["to-silver"]}`} id="to-next-page"
                                    onClick={this.onButtonClickedHandler}><span>DT</span></button>
                            <button className={`${styles["double-arrow-right-icon"]} ${styles["clickable"]} ${styles["to-silver"]}`} id="to-last-page"
                                    onClick={this.onButtonClickedHandler}><span>DT</span></button>
                        </section>
                        : null
                }
                {
                    this.props.personList.length > 0 ?
                    <section className={styles["person-list-container"]}>
                        {
                            this.props.personList.map(item => {
                                return(
                                    <div className={`${styles["person-container"]} ${styles["clickable"]} ${styles["to-blue"]}`} key={item.getFullName() + item.getStreet()}>
                                        <PersonCard person={item} onClick={this.props.selectedPersonHandler}></PersonCard>
                                    </div>
                                )
                            })
                        }
                    </section>
                         : null
                }
                {
                    this.props.pagesNumber > 1 ?
                        <section className={styles["page-handler"]}>
                            <button className={`${styles["double-arrow-left-icon"]} ${styles["clickable"]} ${styles["to-silver"]}`} id="to-first-page"
                                    onClick={this.onButtonClickedHandler}><span>DT</span></button>
                            <button className={`${styles["arrow-left-icon"]} ${styles["clickable"]} ${styles["to-silver"]}`} id="to-previous-page"
                                    onClick={this.onButtonClickedHandler}><span>DT</span></button>

                            <div className={styles["page-from-total"]}>
                                <input type="number" value={this.props.currentPage} onChange={this.inputChangeHandler}/>
                                <span> / {this.props.pagesNumber.toString()}</span>
                            </div>

                            <button className={`${styles["arrow-right-icon"]} ${styles["clickable"]} ${styles["to-silver"]}`} id="to-next-page"
                                    onClick={this.onButtonClickedHandler}><span>DT</span></button>
                            <button className={`${styles["double-arrow-right-icon"]} ${styles["clickable"]} ${styles["to-silver"]}`} id="to-last-page"
                                    onClick={this.onButtonClickedHandler}><span>DT</span></button>
                        </section>
                        : null
                }
            </div>
        );
    }

    inputChangeHandler = (event :any) :void => {
        let target = event.target;
        let pattern :RegExp = new RegExp("^[0-9]+$");

        if(!target.value){
            this.props.pageChangeHandler("");
        }
        if(target.value.match(pattern)) {
            let inputAsNumber :number = Number.parseInt(target.value);

            if (inputAsNumber > 0 && inputAsNumber <= this.props.pagesNumber && inputAsNumber !== parseInt(this.props.currentPage)) {
                this.props.pageChangeHandler(target.value);
            }
        }

        return
    }

    onButtonClickedHandler = (event :any) :void => {
        let target = event.target;

        if(target.id === "to-first-page" && parseInt(this.props.currentPage) !== 1) {
            this.props.pageChangeHandler("1");
        } else if(target.id === "to-previous-page") {
            let currentPage :number = parseInt(this.props.currentPage);

            if(!this.props.currentPage){
                this.props.pageChangeHandler("1");
            }else if(currentPage > 1){
                this.props.pageChangeHandler((currentPage - 1).toString());
            }
        } else if(target.id === "to-next-page") {
            let currentPage :number = parseInt(this.props.currentPage);

            if(!this.props.currentPage){
                this.props.pageChangeHandler("1");
            }else if(currentPage + 1 <= this.props.pagesNumber){
                this.props.pageChangeHandler((currentPage + 1).toString());
            }
        } else if(target.id === "to-last-page" && parseInt(this.props.currentPage) !== this.props.pagesNumber) {
            this.props.pageChangeHandler(this.props.pagesNumber.toString());
        }

        return
    }
}



