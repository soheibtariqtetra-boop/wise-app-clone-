import React from 'react'
import ProfileMenuRow from '../../components/ProfileMenuRow/ProfileMenuRow'
import ProfileSettingsRow from '../../components/ProfileSettingsRow/ProfileSettingsRow'
import ProfileInfoRow from '../../components/ProfileInfoRow/ProfileInfoRow'
import './ProfileScreen.css'

import imgBack from '../../assets/profile/shared/btn-back.png'
import imgAvatarBg from '../../assets/profile/shared/avatar-bg.png'
import imgCameraBadge from '../../assets/profile/shared/badge-camera.png'
import imgWiseFlag from '../../assets/profile/shared/icon-wise-flag.png'
import imgInbox from '../../assets/profile/account/icon-inbox.png'
import imgPlan from '../../assets/profile/account/icon-plan.png'
import imgHelp from '../../assets/profile/account/icon-help.png'
import imgStatements from '../../assets/profile/account/icon-statements.png'

import imgTeamMembers from '../../assets/profile/settings/icon-team.png'
import imgSecurity from '../../assets/profile/settings/icon-security.png'
import imgNotifications from '../../assets/profile/settings/icon-notifications.png'
import imgPaymentMethods from '../../assets/profile/settings/icon-payment-methods.png'
import imgLimits from '../../assets/profile/settings/icon-limits.png'
import imgLanguage from '../../assets/profile/settings/icon-language.png'
import imgPersonal from '../../assets/profile/settings/icon-personal.png'
import imgBusiness from '../../assets/profile/settings/icon-business.png'

import imgReferrals from '../../assets/profile/actions/icon-referrals.png'
import imgAgreements from '../../assets/profile/actions/icon-agreements.png'
import imgRate from '../../assets/profile/actions/icon-rate.png'
import imgClose from '../../assets/profile/actions/icon-close.png'
import imgLogout from '../../assets/profile/actions/icon-logout.png'

function ProfileScreen({ onBack }) {
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const scrollTarget = params.get('scroll')
    if (scrollTarget) {
      let targetEl = null
      if (scrollTarget === 'settings') {
        targetEl = document.querySelector('.profile-settings-list')
      } else if (scrollTarget === 'actions') {
        targetEl = document.querySelector('.profile-actions-section')
      } else if (scrollTarget === 'bottom') {
        targetEl = document.querySelector('.profile-feedback-section')
      }
      const body = document.querySelector('.profile-body')
      if (targetEl && body) {
        const offset = targetEl.getBoundingClientRect().top - body.getBoundingClientRect().top + body.scrollTop
        body.scrollTop = offset
      }
    }
  }, [])

  return (
    <div className="profile-screen" data-node-id="7:492">
      {/* ── Top Bar Area (Figma node 7:530) ── */}
      <header className="profile-top-bar" data-node-id="7:530">
        <button
          type="button"
          className="profile-top-bar__back"
          onClick={onBack}
          aria-label="Back to Home"
          data-node-id="7:534"
        >
          <img src={imgBack} alt="" className="profile-top-bar__back-img" draggable={false} />
        </button>

        <button
          type="button"
          className="profile-top-bar__open-account"
          aria-label="Open an account"
          data-node-id="7:531"
        >
          <span className="profile-top-bar__open-account-text" data-node-id="7:533">
            Open an account
          </span>
        </button>
      </header>

      {/* ── Scrollable Body Content (Figma node 7:496) ── */}
      <main className="profile-body" data-node-id="7:496">
        {/* ── Identity Section (Figma node 7:520) ── */}
        <section className="profile-identity" data-node-id="7:520" aria-label="Account Identity">
          {/* Avatar with Camera Badge */}
          <div className="profile-identity__avatar-wrapper" data-node-id="7:527">
            <div className="profile-identity__avatar">
              <img src={imgAvatarBg} alt="" className="profile-identity__avatar-bg" draggable={false} />
              <span className="profile-identity__avatar-initials" data-node-id="7:529">ML</span>
            </div>
            <img
              src={imgCameraBadge}
              alt=""
              className="profile-identity__camera-badge"
              draggable={false}
              data-node-id="7:528"
            />
          </div>

          {/* Business Name (Figma node 7:526) */}
          <h1
            className="profile-identity__name"
            data-node-id="7:526"
            aria-label="MUHAMMAD AHSAN AYAZ LTD"
          >
            <span className="profile-identity__name-line" aria-hidden="true">
              <span style={{ letterSpacing: '-2.8438px' }}>MUHAMMA</span>
              <span>D</span>
            </span>
            <span className="profile-identity__name-line" aria-hidden="true">
              <span style={{ letterSpacing: '-2.8438px' }}>A</span>
              <span style={{ letterSpacing: '-3.25px' }}>H</span>
              <span style={{ letterSpacing: '-3.6563px' }}>S</span>
              <span style={{ letterSpacing: '-2.8438px' }}>A</span>
              <span>N</span>
              <span style={{ letterSpacing: '-4.0625px' }}> </span>
              <span style={{ letterSpacing: '-8.125px' }}>A</span>
              <span style={{ letterSpacing: '-8.125px' }}>y</span>
              <span style={{ letterSpacing: '-2.8438px' }}>a</span>
              <span>Z</span>
              <span style={{ letterSpacing: '-4.0625px' }}> </span>
              <span style={{ letterSpacing: '-8.5313px' }}>L</span>
              <span style={{ letterSpacing: '-3.25px' }}>T</span>
              <span>D</span>
            </span>
          </h1>

          {/* Account Type (Figma node 7:525) */}
          <p className="profile-identity__type" data-node-id="7:525">
            Business account
          </p>

          {/* Email Pill (Figma node 7:521) */}
          <div className="profile-identity__email-pill" data-node-id="7:521">
            <img src={imgWiseFlag} alt="" className="profile-identity__email-icon" draggable={false} data-node-id="7:524" />
            <span className="profile-identity__email-text" data-node-id="7:523">
              MujhKoRanaGmaafKrna@gmail.com
            </span>
          </div>
        </section>

        {/* ── Your Account Section (Figma node 109:2) ── */}
        <section className="profile-account-section" data-node-id="109:2" aria-label="Your account">
          <h2 className="profile-account-section__heading" data-node-id="7:519">
            Your account
          </h2>

          <div className="profile-account-section__menu">
            <ProfileMenuRow
              icon={imgInbox}
              label="Inbox"
              dataNodeId="7:514"
            />

            <ProfileMenuRow
              icon={imgPlan}
              label="Your plan"
              subtitle="Advanced"
              dataNodeId="7:509"
            />

            <ProfileMenuRow
              icon={imgHelp}
              label="Help"
              dataNodeId="7:505"
            />

            <ProfileMenuRow
              icon={imgStatements}
              label="Statements and reports"
              dataNodeId="7:499"
            />
          </div>
        </section>

        {/* ── Settings Section (Figma node 7:497 + 21:7) ── */}
        <section className="profile-settings-section" data-node-id="7:497" aria-label="Settings">
          <h2 className="profile-settings-section__heading" data-node-id="7:498">
            Settings
          </h2>

          <div className="profile-settings-list" data-node-id="21:7">
            <ProfileSettingsRow
              icon={imgTeamMembers}
              title="Team members and payment approvals"
              description="Manage team members' account permissions"
              height={134.875}
              paddingTop={19.5}
              titleWidth={241.042}
              descWidth={232.375}
              titleColor="#d2d4d0"
              descColor="#adb0ab"
              titleLineHeight="23.91px"
              descLineHeight="20.761px"
              chevronY={39}
              dataNodeId="21:43"
            />

            <ProfileSettingsRow
              icon={imgSecurity}
              title="Security and privacy"
              description="Change your security and privacy settings"
              height={101.833}
              paddingTop={14.625}
              titleWidth={169}
              descWidth={239.417}
              titleColor="#cfd1cd"
              descColor="#bdc0bb"
              descLineHeight="22.445px"
              chevronY={34.125}
              dataNodeId="21:38"
            />

            <ProfileSettingsRow
              icon={imgNotifications}
              title="Notifications"
              description="Customise how you get updates"
              height={77.458}
              paddingTop={11.375}
              titleWidth={105.083}
              descWidth={229.125}
              titleColor="#d5d7d3"
              descColor="#bfc2bd"
              chevronY={30.875}
              dataNodeId="21:33"
            />

            <ProfileSettingsRow
              icon={imgPaymentMethods}
              title="Payment methods"
              description="Manage saved cards and bank accounts that are linked to this account"
              height={125.667}
              paddingTop={11.375}
              titleWidth={150.583}
              descWidth={221}
              titleColor="#d1d3cf"
              descColor="#c1c4bf"
              descLineHeight="21.963px"
              chevronY={30.875}
              dataNodeId="21:28"
            />

            <ProfileSettingsRow
              icon={imgLimits}
              title="Limits"
              description="Manage your transfer and card limits"
              titleBold={true}
              titleSize={16.25}
              height={99.667}
              paddingTop={13.542}
              titleWidth={49.833}
              descWidth={218.833}
              titleColor="#d1d3cf"
              descColor="#c1c4bf"
              descLineHeight="20.761px"
              chevronY={33.042}
              dataNodeId="21:23"
            />

            <ProfileSettingsRow
              icon={imgLanguage}
              title="Language and appearance"
              description="Customise language settings and which theme is used"
              height={101.292}
              paddingTop={13.0}
              titleWidth={218.292}
              descWidth={237.25}
              titleColor="#d3d5d1"
              descColor="#bfc2be"
              descLineHeight="21.227px"
              chevronY={32.5}
              dataNodeId="21:18"
            />

            <ProfileSettingsRow
              icon={imgPersonal}
              title="Personal details"
              description="Update your personal information"
              height={77.458}
              paddingTop={10.833}
              titleWidth={131.083}
              descWidth={237.792}
              titleColor="#dcdeda"
              descColor="#c2c5c1"
              chevronY={30.333}
              dataNodeId="21:13"
            />

            <ProfileSettingsRow
              icon={imgBusiness}
              title="Business details"
              height={37.375}
              paddingTop={10.833}
              iconHeight={26}
              titleWidth={134.875}
              titleColor="#d0d3cf"
              chevronHeight={6.5}
              chevronY={30.333}
              isClipped={true}
              dataNodeId="21:9"
            />
          </div>
        </section>

        {/* ── Actions and Agreements Section (Figma node 113:2) ── */}
        <section className="profile-actions-section" data-node-id="113:2" aria-label="Actions and agreements">
          <h2 className="profile-actions-section__heading" data-node-id="21:101">
            Actions and agreements
          </h2>

          <div className="profile-actions-list">
            <ProfileSettingsRow
              icon={imgReferrals}
              title="Referrals"
              description="Send and manage referrals"
              height={83.958}
              paddingTop={15.167}
              titleWidth={75.292}
              descWidth={190.667}
              titleColor="#c4c6c2"
              descColor="#adb0ab"
              chevronY={34.667}
              dataNodeId="21:95"
            />

            <ProfileSettingsRow
              icon={imgAgreements}
              title="Our agreements"
              height={71.5}
              paddingTop={7.042}
              titleWidth={133.792}
              titleColor="#cbcdc9"
              chevronY={26.542}
              dataNodeId="21:91"
            />

            <ProfileSettingsRow
              icon={imgRate}
              title="Rate us"
              description="Write a Play Store review"
              height={78.542}
              paddingTop={12.458}
              titleWidth={62.292}
              descWidth={178.75}
              titleColor="#c6c8c4"
              descColor="#b0b3ae"
              descSize={15.167}
              chevronY={31.958}
              dataNodeId="21:86"
            />

            <ProfileSettingsRow
              icon={imgClose}
              title="Close account"
              description="Close the business account for Muhammad Ahsan Ayaz Ltd"
              height={99.667}
              paddingTop={11.375}
              titleWidth={118.625}
              descWidth={221.542}
              descLineHeight="21.1px"
              titleColor="#d0d3cf"
              descColor="#b3b6b1"
              chevronY={30.875}
              dataNodeId="21:81"
            />

            <ProfileSettingsRow
              icon={imgLogout}
              title="Log out"
              height={71.5}
              paddingTop={5.417}
              titleWidth={62.833}
              titleColor="#ced0cc"
              chevronY={24.917}
              dataNodeId="21:77"
            />
          </div>
        </section>

        {/* ── Membership & App Version Info (Figma nodes 21:71 & 21:65) ── */}
        <section className="profile-info-section" aria-label="Account and App Information">
          <ProfileInfoRow
            label="Your membership number"
            value="P101684505"
            labelBold={true}
            labelColor="#d2d4d0"
            valueSize={14.625}
            valueColor="#c3c6c1"
            copyBorder={true}
            height={74.208}
            dataNodeId="21:71"
            buttonDataNodeId="21:72"
          />

          <ProfileInfoRow
            label="Your app version"
            value="v9.43.0 (1722)"
            labelBold={false}
            labelColor="#d9dbd7"
            valueSize={15.167}
            valueColor="#c2c5c1"
            copyBorder={false}
            height={79.083}
            dataNodeId="21:65"
            buttonDataNodeId="21:66"
          />
        </section>

        {/* ── Feedback Section (Figma node 21:61) ── */}
        <section className="profile-feedback-section" data-node-id="21:61" aria-label="Give us feedback">
          <p className="profile-feedback-section__prompt" data-node-id="21:63">
            Tell us what you think about Wise.
          </p>
          <a
            href="#feedback"
            className="profile-feedback-section__link"
            data-node-id="21:62"
            onClick={(e) => e.preventDefault()}
          >
            Give us feedback
          </a>
        </section>
      </main>
    </div>
  )
}

export default ProfileScreen
