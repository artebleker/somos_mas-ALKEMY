import React from 'react';
import {
	TwitterButton,
	TwitterTweet,
	LinkedinProfile,
} from 'react-social-plugins';
// import {
// 	TiSocialFacebook,
// 	TiSocialInstagram,
// 	TiSocialLinkedin,
// } from 'react-icons/ti';
// import { Link } from 'react-router-dom';
import './SocialNetwork.css';

const SocialNetworks = () => {
	return (
		<div className='socialnet_container'>
			<h2 className='socialnet_title'>Síguenos en nuestras redes sociales</h2>
			<div className='socialnet_container-icons'>
				<div>
					<TwitterTweet
						coversation='none'
						tweetId='1512964350386094087'
						theme='light'
						width={325}
					/>
					<TwitterTweet
						coversation='none'
						tweetId='1512964456392929289'
						theme='light'
						width={325}
					/>
				</div>
				{/* <div className='socialnet_iconslist'>
					<Link href='https://www.linkedin.com/in/somos-mas-0b1436237/'>
						<TiSocialLinkedin />
					</Link>
					<Link href='https://www.instagram.com/somosmas161/'>
						<TiSocialInstagram />
					</Link>
					<Link href='https://www.facebook.com/somos.mas.9'>
						<TiSocialFacebook />
					</Link>
				</div> */}
			</div>

			<TwitterButton target='somosmas161' type='Mention' size='large' />
			<LinkedinProfile
				lang='en_US'
				profileUrl='https://www.linkedin.com/in/somos-mas-0b1436237/'
				format='inline'
				text='Praveenkumar K'
			/>
		</div>
	);
};

export default SocialNetworks;
