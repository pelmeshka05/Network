import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { AppStateType } from '../redux/redux-store';

// Типы для пропсов, которые будут приходить из state
type MapPropsType = {
    isAuth: boolean;
}

type DispatchPropsType = {
    // Здесь можно добавить типы для пропсов, которые будут приходить через dispatch, если они есть
}

// Тип для пропсов компонента, передаваемого в HOC
type WrappedComponentProps = {
    // Здесь указываем все пропсы, которые должен принимать WrappedComponent
}

// Указываем тип пропсов для компонента, обернутого в HOC
export function withAuthRedirect<WCP extends React.JSX.IntrinsicAttributes>(WrappedComponent: React.ComponentType<WCP>) {
    const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
        const { isAuth, ...restProps } = props;

        // Если нет авторизации, редиректим на страницу логина
        if (!isAuth) return <Redirect to="/login" />;

        // Передаем оставшиеся пропсы в WrappedComponent
        return <WrappedComponent {...restProps as WCP} />;
    };

    const ConnectedAuthRedirectComponent = connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(
        mapStateToPropsForRedirect,
        {} // Можно добавить actions, если они нужны
    )(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}

// Функция для получения состояния из Redux
let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
});
