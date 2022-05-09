import React, { Suspense, lazy } from 'react';
import { Route } from 'react-router-dom';
import TransitionSwitch from '../shared/TransitionSwitch';
import PublicRoute from './PublicRoute';
const SchoolCampaign = lazy(() => import('../Campaigns/School/SchoolCampaign'));
const ToysCampaign = lazy(() => import('../Campaigns/Toys/ToysCampaign'));
const About = lazy(() => import('../Components/About/About'));
const Activities = lazy(() => import('../Components/Activities/Activities'));
const ActivitiesDetail = lazy(() =>
	import('../Components/Activities/Detail/ActivitiesDetail')
);
const LoginForm = lazy(() => import('../Components/Auth/LoginForm'));
const RegisterForm = lazy(() => import('../Components/Auth/RegisterForm'));
const Contact = lazy(() => import('../Components/Contact/Contact'));
const NewsDetail = lazy(() => import('../Components/News/Detail/NewsDetail'));
const NewsPage = lazy(() => import('../Components/News/NewsPage'));
const Home = lazy(() => import('../Components/Home/Home'));
const PageNotFound = lazy(() => import('../Components/Shared/PageNotFound'));

const PublicWebRutes = () => {
	return (
		<Suspense fallback={<div className='load-suspence'>Cargando...</div>}>
			<TransitionSwitch>
				<PublicRoute path='/auth/login' component={LoginForm} />
				<PublicRoute path='/auth/register' component={RegisterForm} />
				<Route path='/actividades/:id' component={ActivitiesDetail} />
				<Route path='/novedades/:id' component={NewsDetail} />
				<Route path='/actividades' component={Activities} />
				<Route path='/school-campaign' component={SchoolCampaign} />
				<Route path='/toys-campaign' component={ToysCampaign} />
				<Route path='/novedades' component={NewsPage} />
				<Route path='/nosotros' component={About} />
				<Route path='/contact' component={Contact} />
				<Route path='/' exact component={Home} />
				<Route path='/somos_mas-ALKEMY' exact component={Home} />
				{!window.location.href.includes('backoffice') && (
					<Route path='*' component={PageNotFound} />
				)}
			</TransitionSwitch>
		</Suspense>
	);
};

export default PublicWebRutes;
