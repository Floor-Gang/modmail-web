import { useState } from 'react';
import { Category } from '@Floor-Gang/modmail-types';
import { AxiosResponse } from 'axios';
import { useTranslation } from 'react-i18next';
import { useAxios } from './index';
import { FG, Nullable, Optional } from '../types';

export default function useCategories() {
    const { t } = useTranslation();
    const [categories, setCategories] = useState<Optional<Category[]>>(undefined);
    const { axios } = useAxios();

    function fetchCategories(): Promise<Category[]> {
        return axios
            .get(t('urls.categories'))
            .then((response: AxiosResponse<FG.Api.CategoriesResponse>) => {
                console.log(response);
                if (response.status === 200) {
                    setCategories(response.data);
                    return response.data;
                }
                setCategories([]);
                return [];
            })
            .catch((err) => {
                console.error(err);
                setCategories([]);
                return [];
            });
    }

    function fetchOneCategory(category: string): Promise<Nullable<Category>> {
        return axios
            .get(t('urls.categoriesOne', { category }))
            .then((response: AxiosResponse<FG.Api.CategoryOneResponse>) => {
                console.log(response);
                if (response.status === 200) {
                    return response.data;
                }
                return null;
            })
            .catch((err) => {
                console.error(err);
                return null;
            });
    }

    function findCategoryById(id: string): Nullable<Category> {
        if (categories instanceof Array) {
            return categories.find((cat) => cat.id === id) || null;
        }
        return null;
    }

    function resetCategories() {
        setCategories([]);
    }

    return {
        categories,
        fetch: fetchCategories,
        fetchOne: fetchOneCategory,
        findById: findCategoryById,
        reset: resetCategories,
    };
}
