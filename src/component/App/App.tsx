import React, {Component, ReactNode} from 'react';
import yungas_logo from './assets/yungas_logo.webp';
import styles from './App.module.scss';

import Search from "../Search/Search";
import Results from "../Results/Results";
import Person from "../../model/Person";
import PeopleApiHttpMock from "../../service/PeopleApiHttpMock/PeopleApiHttpMock";
import PersonDetails from "../PersonDetails/PersonDetails";

type Props = {};
type State = {
    personList :Person[],
    pagesNumber :number,
    currentPage :string,
    lastUsedFilter : {
        ordering :string,
        region :string,
        text :string,
        textSearchOptions : {
            name :boolean,
            address :true,
            city :true
        }
    },
    showPersonInfo :boolean,
    selectedPerson :Person | null
};

export default class App extends Component<Props, State> {
    public state: State;
    public backend :PeopleApiHttpMock;

    constructor(props: Props) {
        super(props);

        this.backend = new PeopleApiHttpMock();

        this.state = {
            personList: [],
            pagesNumber: 1,
            currentPage: "1",
            lastUsedFilter : {
                ordering: "order-ascending",
                region: "",
                text: "",
                textSearchOptions: {
                    name: true,
                    address: true,
                    city: true
                }
            },
            showPersonInfo: false,
            selectedPerson: null
        }
    }

    componentDidMount() :void {
        this.onSearch(this.state.lastUsedFilter)

        return
    }

    shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): boolean {
        if(nextState.pagesNumber !== this.state.pagesNumber){
            return true;
        }

        if(nextState.showPersonInfo !== this.state.showPersonInfo){
            return true;
        }

        if(nextState.selectedPerson !== this.state.selectedPerson){
            return true;
        }

        if(nextState.currentPage !== this.state.currentPage){
            return true;
        }

        if(nextState.personList.length === this.state.personList.length){
            for(let i = 0; i < nextState.personList.length; i++){
                if(nextState.personList[i].getFullName() !== this.state.personList[i].getFullName() &&
                    nextState.personList[i].getStreet() !== this.state.personList[i].getStreet()){
                    return true;
                }
            }
        }else {
            return true;
        }

        return false;
    }

    render(): ReactNode {
        return (
            <div className={styles.App}>
                {
                    this.state.showPersonInfo && this.state.selectedPerson ?
                    <div className={styles["modal"]} >
                        <PersonDetails person={this.state.selectedPerson} closeHandler={this.closeModal}></PersonDetails>
                    </div>
                 : null
                }

                <section className={styles["header"]}>
                    <img alt="Logotipo da Yungas" src={yungas_logo} className={styles["logo"]}/>
                </section>

                <h1>BUSCA DE PESSOAS</h1>

                <section className={styles["search-container"]}>
                    <Search onButtonClick={this.onSearch}></Search>
                </section>

                <section className={styles["results-container"]}>
                    <Results recordsPerPage={20}
                             pagesNumber={this.state.pagesNumber}
                             personList={this.state.personList}
                             currentPage={this.state.currentPage.toString()}
                             pageChangeHandler={this.onPageChangeHandler}
                             selectedPersonHandler={this.openModal}>

                    </Results>
                </section>

                <section className={styles["footer"]}>
                        <span>Guilherme Suardi Calin</span>
                        <span>Full Stack Developer</span>
                </section>
            </div>
        );
    }

    onSearch = (filter :any, page :number = 1) :void => {
        let results :any = this.backend.getFromFilter(filter, page);
        let pagesNumber :number = Math.ceil(results["total_items"] / results["page_size"]);

        this.setState({
            personList: results.personList,
            currentPage: page.toString(),
            pagesNumber,
            lastUsedFilter: filter
        })

        return
    }

    onPageChangeHandler = (page :string) :void => {
        if(page){
            this.onSearch(this.state.lastUsedFilter, parseInt(page));
        }else {
            this.setState({
                currentPage: ""
            })
        }

        return
    }

    closeModal = () :void => {
        if(this.state.showPersonInfo){
            this.setState({
                showPersonInfo: false
            });
        }

        return
    }

    openModal = (person :Person) :void => {
            this.setState({
                showPersonInfo: true,
                selectedPerson: person
            });

        return
    }
}
