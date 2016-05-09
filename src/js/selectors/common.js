import isEqual from 'lodash/lang/isEqual';
import selectn from 'selectn';
import { createSelectorCreator, defaultMemoize } from 'reselect';

// Create a "selector creator" that uses lodash.isEqual instead of '==='
// More info you can find in: https://github.com/faassen/reselect#api
export const createDeepEqualSelector = createSelectorCreator(
    defaultMemoize,
    isEqual
);

// Выбирает поле ui из стора
export const uiSelector = state => state.ui;
// Выбирает поле router из стора
export const routerSelector = state => state.router;

// Возвращает из стора переменную status.ready которая отвечает за готовность приложения к работе.
export const appIsReady = state => state.status.ready;
// Возвращает значение переменной которая отвечает вошел пользователь в систему или нет.
// Проверяет поле user в status.auth
export const userIsLoggedInSelector = state => state.status.auth.user ? true : false;

export const isExpandedLeftPanel = state => state.status.app.isExpandedLeftPanel;

export const isAuthenticatedSelector = createDeepEqualSelector(
    [userIsLoggedInSelector],
    userIsLoggedIn => ({isAuthenticated: userIsLoggedIn})
);

// Выбирает конкретный статус из стора.
// С помощью переменной type указывается тип статуса.
export const statusSelector = type => state => state.status[type];
// Выбирает конкретные сущности из стора.
// С помощью переменной type указывается тип сущности.
export const entitiesSelector = type => state => state.entities[type];


// Router selectors

// Возвращает значение переменной nextPathname которая хранится в роутере.
export const nextPathnameSelector = createDeepEqualSelector(
    [routerSelector],
    router => selectn('location.state.nextPathname', router) || '/'
);

// Вовзращает значние ключа который находится в url.
// Например если URL: /tickets/:ticketsType => /tickets/all
// тогда если переменная name переданная в селектор будет равна: 'ticketsType',
// селектор вернет значение: all.
export const routerParamSelector = name => createDeepEqualSelector(
    [routerSelector],
    router => router.params[name]
);

export const routerQuerySelector = name => createDeepEqualSelector(
    [routerSelector],
    router => router.location.query[name]
);

// Entities selectors

// Возвращает сущности определенного типа (type) в виде массива.
export const entitiesArraySelector = type => createDeepEqualSelector(
    [entitiesSelector(type)],
    entities => Object.keys(entities).map(id => entities[id])
);

// Возвращает конкретную сушность по указанному типу (type) сущности и её id
export const entitySelector = (type, id) => createDeepEqualSelector(
    [entitiesSelector(type)],
    entities => entities[id]
);


// Users selectors

export const currentUserSelector = createDeepEqualSelector(
    [statusSelector('auth'), entitiesSelector('users')],
    (authStatus, usersEntities) => usersEntities[authStatus.user]
);

/* COMPONENTS SELECTORS */

// Вовзрашает данные для компонента: containers/Login
// Берет всё что находится в status.auth и добавляет ещё один ключ: nextPathname
export const loginContainerSelector = createDeepEqualSelector(
    [statusSelector('auth'), nextPathnameSelector],
    (auth, nextPathname) => ({
        ...auth,
        nextPathname
    })
);

// Вовзрашает данные для компонента: containers/AuthenticatedApp
// Берет состояние готовности приложения.
export const authenticatedAppSelector = createDeepEqualSelector(
    [appIsReady],
    ready => ({ ready })
);

// Вовзрашает данные для компонента: containers/Main
// Берет текущего пользователя.
export const mainSelector = createDeepEqualSelector(
    [currentUserSelector, isExpandedLeftPanel],
    (currentUser, isExpandedLeftPanel) => ({
        user: currentUser,
        isExpandedLeftPanel: isExpandedLeftPanel
    })
);
