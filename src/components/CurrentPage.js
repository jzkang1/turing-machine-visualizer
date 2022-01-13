import { useContext } from "react";
import { GlobalStoreContext, GlobalStorePageType } from '../store/index.js';
import HomePage from './HomePage.js';
import AboutPage from './AboutPage.js';
import Input from "./Input.js";

export default function CurrentPage(props) {
    const {store} = useContext(GlobalStoreContext);

    function getCurrentPage() {
        switch(store.currentPage) {
            case GlobalStorePageType.HOME:
                return <HomePage/>;
            case GlobalStorePageType.ABOUT:
                return <AboutPage/>;
            case GlobalStorePageType.VISUALIZE:
                return <Input></Input>;
            default:
                return <HomePage/>;
        }
    }

    return getCurrentPage();
}