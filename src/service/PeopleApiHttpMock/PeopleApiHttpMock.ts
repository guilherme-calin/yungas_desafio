import people from './people.json'
import Person from "../../model/Person";

export default class PeopleApiHttpMock{
    private stateRegion :Map<String, String>;

    constructor(){
        this.stateRegion = new Map();
        this.stateRegion.set("rio grande do sul", "Sul")
            .set("santa catarina", "Sul")
            .set("paraná", "Sul")
            .set("são paulo", "Sudeste")
            .set("rio de janeiro", "Sudeste")
            .set("espírito santo", "Sudeste")
            .set("minas gerais", "Sudeste")
            .set("mato grosso do sul", "Centro-Oeste")
            .set("goiás", "Centro-Oeste")
            .set("distrito federal", "Centro-Oeste")
            .set("mato grosso", "Centro-Oeste")
            .set("bahia", "Nordeste")
            .set("sergipe", "Nordeste")
            .set("alagoas", "Nordeste")
            .set("pernambuco", "Nordeste")
            .set("paraíba", "Nordeste")
            .set("rio grande do norte", "Nordeste")
            .set("ceará", "Nordeste")
            .set("piauí", "Nordeste")
            .set("maranhão", "Nordeste")
            .set("tocantins", "Norte")
            .set("pará", "Norte")
            .set("amapá", "Norte")
            .set("roraima", "Norte")
            .set("amazonas", "Norte")
            .set("rondônia", "Norte")
            .set("acre", "Norte");
    }

    getFromFilter(filterOptions :any, page? :number) {
        const pageSize :number = 20;
        let pageItems :any[] = [];
        let personList :Person[] = [];

        let filteredFile :any = people.results.filter((item) => {
            let push :boolean = false;

            if(filterOptions.text){
                if(!push && filterOptions?.textSearchOptions?.name ) {
                    if(item.name.first.includes(filterOptions.text) ||
                        item.name.last.includes(filterOptions.text)) {
                        push = true;
                    }
                }

                if(!push && filterOptions?.textSearchOptions?.address ) {
                    if(item.location.street.includes(filterOptions.text)) {
                        push = true;
                    }
                }

                if(!push && filterOptions?.textSearchOptions?.city ) {
                    if(item.location.city.includes(filterOptions.text)) {
                        push = true;
                    }
                }
            }else {
                push = true;
            }

            if(push && filterOptions.region && filterOptions.region !== ""){
                if(this.stateRegion.get(item.location.state) !== filterOptions.region){
                    push = false;
                }
            }

            if(push){
                Object.defineProperty(item.location, "region", {
                    value: this.stateRegion.get(item.location.state),
                    writable: true
                });
            }

            return push
        }).sort((a, b) => {
            if(filterOptions.ordering && filterOptions.ordering === "order-ascending"){
                return (`${a.name.first} ${a.name.last}`).localeCompare(`${b.name.first} ${b.name.last}`);
            }else{
                return (`${b.name.first} ${b.name.last}`).localeCompare(`${a.name.first} ${a.name.last}`);
            }
        });

        if(!page) {
            page = 1;
        }

        pageItems = filteredFile.slice((page - 1) * pageSize, page * pageSize);

        for(let item of pageItems){
            personList.push(new Person(item));
        }

        return {
            page,
            page_size: pageSize,
            total_items: filteredFile.length,
            items: pageItems,
            personList
        }
    }
}