import React, {useEffect, useReducer} from 'react';
import {TopPageComponentProps} from "./TopPageComponent.props";
import {Advantages, HhData, Htag, Product, Sort, Tag} from "../../components";
import styles from './TopPageComponent.module.css';
import {TopLevelCategory} from "../../interfaces/page.intirface";
import {SortEnum} from "../../components/Sort/Sort.props";
import {sortReducer} from "./sort.reducer";


const TopPageComponent = ({page, products, firstCategory}:TopPageComponentProps):JSX.Element => {
    const initialState = {products:[...products], sort:SortEnum.Price};
    const [{products: sortedProducts, sort}, dispatchSort] = useReducer(sortReducer, initialState);

    useEffect(() => {
        dispatchSort({type:'INIT', payload:products});
    }, [products]);

    const setSort = (sort:SortEnum) => {
      dispatchSort({type:sort});
    };


    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag={'h1'}>{page.title}</Htag>
                {products && <Tag color={'grey'} size={'m'} aria-label={products.length + 'элементов'}> {products.length}</Tag>}
                <Sort sort={sort} setSort={setSort}/>
            </div>
            <div>
                {products && sortedProducts.map(p => (<Product layout product={p} key={p._id}/>))}
            </div>
            <div className={styles.hhTitle}>
                <Htag tag={'h2'}>Вакансии - {page.category}</Htag>
                <Tag color={'red'} size={'m'}>hh.ru</Tag>
            </div>
            { firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh}/>}
            {page.advantages &&  page.advantages.length > 0 && <>
                <Htag tag={'h2'}>Преимущества</Htag>
                <Advantages advantages={page.advantages}/>
            </>}
            {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{__html:page.seoText}}/>}
            <Htag tag={'h2'}>Получаемые навыки</Htag>
            {page.tags.map(t => (
                <Tag key={t} color={'primary'}>{t}</Tag>
            ))}
        </div>
    );
};

export default TopPageComponent;