import React from 'react';
import PropTypes from 'prop-types';
import './Contact.css';
import { GoLocation } from 'react-icons/go';
import {
	TiSocialFacebook,
	TiSocialInstagram,
	TiSocialTwitter,
	TiSocialLinkedin,
} from 'react-icons/ti';

const Contact = ({ facebook, linkedin, instagram, twitter, address }) => {
	return (
		<section className='datacontact_container'>
			<div>
				<ul>
					<li>
						<span>
							<GoLocation />
						</span>
						{address}
					</li>
					<li>
						<a href={facebook}>
							<span>
								<TiSocialFacebook />
							</span>
							Facebook
						</a>
					</li>
					<li>
						<a href={linkedin}>
							<span>
								<TiSocialLinkedin />
							</span>
							LinkedIn
						</a>
					</li>
					<li>
						<a href={instagram}>
							<span>
								<TiSocialInstagram />
							</span>
							Instagram
						</a>
					</li>
					<li>
						<a href={twitter}>
							<span>
								{' '}
								<TiSocialTwitter />
							</span>
							Twitter
						</a>
					</li>
				</ul>
			</div>
		</section>
	);
};

export default Contact;

Contact.propTypes = {
	address: PropTypes.string,
	phone: PropTypes.string,
	linkedin: PropTypes.string,
	facebook: PropTypes.string,
	instagram: PropTypes.string,
	twitter: PropTypes.string,
};
