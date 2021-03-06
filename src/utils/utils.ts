import { parse } from 'query-string';
import { pathToRegexp } from 'path-to-regexp';
import { Route } from '@/models/connect';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
    if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
        return true;
    }
    return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
    const { NODE_ENV } = process.env;
    if (NODE_ENV === 'development') {
        return true;
    }
    return isAntDesignPro();
};

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */
export const getAuthorityFromRouter = <T extends Route>(
    router: T[] = [],
    pathname: string,
): T | undefined => {
    const authority = router.find(
        ({ routes, path = '/' }) =>
            (path && pathToRegexp(path).exec(pathname)) ||
            (routes && getAuthorityFromRouter(routes, pathname)),
    );
    if (authority) return authority;
    return undefined;
};

export const getRouteAuthority = (path: string, routeData: Route[]) => {
    let authorities: string[] | string | undefined;
    routeData.forEach((route) => {
        // match prefix
        if (pathToRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
            if (route.authority) {
                authorities = route.authority;
            }
            // exact match
            if (route.path === path) {
                authorities = route.authority || authorities;
            }
            // get children authority recursively
            if (route.routes) {
                authorities = getRouteAuthority(path, route.routes) || authorities;
            }
        }
    });
    return authorities;
};

export const getResultFromFetchResponse = (res, params) => ({
    data: res.data.results,
    total: res.data.page.totalItems,
    success: true,
    pageSize: params.pageSize,
    current: parseInt(`${params.currentPage}`, 10) || 1,
});

export const coverResultToProTableData = (data: any) => {
    const { results, paging } = data;
    if (Array.isArray(results) && paging) {
        return {
            data: results,
            total: paging.totalItems,
            success: true,
            pageSize: parseInt(`${paging.itemsPerPage}`, 10),
            current: parseInt(`${paging.currentPage}`, 10) || 1,
        };
    }
    if (!Array.isArray(data)) {
        throw new Error('coverResultToProTableData params data must be a array');
    }
    return {
        data,
        total: data.length,
        success: true,
        current: 1,
    };
};
