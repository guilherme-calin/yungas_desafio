import React, {Component, ReactNode} from 'react';
import styles from './Search.module.scss';

type Props = {
    onButtonClick :(filterOptions :any) => void
};
type State = {
    closed :boolean,
    checkboxGroup : {
        name :boolean,
        address :boolean,
        city :boolean
    },
    region :string,
    ordering :string,
    text :string
};

export default class Search extends Component<Props, State> {
    public state: State;

    constructor(props: Props) {
        super(props);
        this.state = {
            closed: true,
            checkboxGroup: {
                name: true,
                address: true,
                city: true
            },
            region: "",
            ordering: "order-ascending",
            text: ""
        };
    }

    render(): ReactNode {
        return (
            <div className={styles["Search"]}>
                <div className={styles["input-container"]}>
                    <input type="search" placeholder="Digite aqui" value={this.state.text}
                           onChange={this.inputChangeHandler}
                           onKeyPress={this.keyPressHandler}/>
                </div>

                <section className={styles["filter"]}>
                    <div className={`${styles["filter-head"]} ${styles["clickable"]} ${styles["to-black"]}`}
                         onClick={this.toggleFilterHandler}>
                        <span className={this.state.closed ? styles["js-arrow-down-icon"] : styles["js-arrow-up-icon"]}>Filtros</span>
                    </div>
                    {
                        !this.state.closed ?
                            <div className={styles["filter-body"]}>
                                <section className={styles["option-group"]}>
                                    <span className={styles["option-header"]}>Busca textual</span>

                                    <div className={styles["checkbox-container"]}>
                                        <input type="checkbox" id="checkbox-name-option"
                                               checked={this.state.checkboxGroup.name} onChange={this.checkboxOnChangeHandler}/>
                                        <label htmlFor="checkbox-name-option">Nome</label>
                                    </div>

                                    <div className={styles["checkbox-container"]}>
                                        <input type="checkbox" id="checkbox-address-option"
                                               checked={this.state.checkboxGroup.address} onChange={this.checkboxOnChangeHandler}/>
                                        <label htmlFor="checkbox-address-option">Endereço</label>
                                    </div>

                                    <div className={styles["checkbox-container"]}>
                                        <input type="checkbox" id="checkbox-city-option"
                                               checked={this.state.checkboxGroup.city} onChange={this.checkboxOnChangeHandler}/>
                                        <label htmlFor="checkbox-city-option">Cidade</label>
                                    </div>
                                </section>

                                <section className={styles["option-group"]}>
                                    <span className={styles["option-header"]}>Região do País</span>
                                        <select onChange={this.selectOnChangeHandler} value={this.state.region}>
                                            <option value="">Todas</option>
                                            <option value="Norte">Norte</option>
                                            <option value="Nordeste">Nordeste</option>
                                            <option value="Centro-Oeste">Centro-Oeste</option>
                                            <option value="Sudeste">Sudeste</option>
                                            <option value="Sul">Sul</option>
                                        </select>
                                </section>

                                <section className={styles["option-group"]}>
                                    <span className={styles["option-header"]}>Ordenação</span>

                                    <div className={styles["radio-container"]}>
                                        <input type="radio" name="order-group" id="order-ascending"
                                               onChange={this.radioOnChangeHandler}
                                               checked={this.state.ordering === "order-ascending" ? true : false}/>
                                        <label htmlFor="order-ascending">Alfabética</label>
                                    </div>
                                    <div className={styles["radio-container"]}>
                                        <input type="radio" name="order-group" id="order-descending"
                                               onChange={this.radioOnChangeHandler}
                                               checked={this.state.ordering === "order-descending" ? true : false}/>
                                        <label htmlFor="order-descending">Alfabética Inversa</label>
                                    </div>
                                </section>

                            </div> : null
                    }
                </section>

                <div className={styles["button-container"]}>
                    <button className={`${styles["clickable"]} ${styles["to-red"]}`} onClick={this.buttonClickHandler}>BUSCAR</button>
                </div>
            </div>
        );
    }

    keyPressHandler = (event :any) :void => {
        let key :string = event.key;

        if(key.toLowerCase() === "enter") {
            this.buttonClickHandler();
        }

        return
    }

    inputChangeHandler = (event :any) :void => {
        let target :any = event.target;

        this.setState({
            text : target.value
        });

        return
    }

    toggleFilterHandler = () :void => {
        this.setState({
            closed : !this.state.closed
        });

        return
    }

    selectOnChangeHandler = (event :any) :void => {
        let target = event.target;

        this.setState({
            region: target.value
        });

        return
    }

    checkboxOnChangeHandler = (event :any) :void => {
        let target = event.target;
        let checkboxGroup = {...this.state.checkboxGroup};

        if(target.id === "checkbox-name-option") {
            checkboxGroup.name = target.checked;

            this.setState({checkboxGroup});
        } else if(target.id === "checkbox-address-option") {
            checkboxGroup.address = target.checked;

            this.setState({checkboxGroup});
        } else if(target.id === "checkbox-city-option") {
            checkboxGroup.city = target.checked;

            this.setState({checkboxGroup});
        }

        return
    }

    radioOnChangeHandler = (event :any) :void => {
        let target = event.target;

        this.setState({
            ordering: target.id
        });

        return
    }
    
    buttonClickHandler = () :void => {
        let textSearchOptions :any = {...this.state.checkboxGroup};
        let region :string = this.state.region.slice(0);
        let ordering :string = this.state.ordering.slice(0);
        let text :string = this.state.text?.slice(0).toLowerCase();

        this.props.onButtonClick({textSearchOptions, region, ordering, text});

        return
    }
}



