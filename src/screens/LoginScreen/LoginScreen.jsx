import './LoginScreen.css'
import { sampleAccountIdentity } from '../../data/sampleAccountIdentity'
import { maskEmailForLogin } from '../../data/authSession'
import imgBack from '../../assets/login/btn-back.png'
import imgWiseLogo from '../../assets/login/wise-logo.png'

/**
 * LoginScreen01 — Figma node 253:6 (390 × 844)
 * Demo saved-account login after logout. Not an official Wise login page.
 * Identity bound to sampleAccountIdentity (same record as Profile / EUR Name).
 */
function LoginScreen({ onLogBackIn, onUseAnotherAccount, onBack }) {
  const displayName = sampleAccountIdentity.fullName
  const avatarInitial =
    sampleAccountIdentity.loginAvatarInitial
    || displayName.trim().charAt(0).toUpperCase()
  const maskedEmail = maskEmailForLogin(sampleAccountIdentity.email)

  return (
    <div
      className="login-screen"
      data-node-id="253:6"
      data-name="LoginScreen01"
      data-demo="true"
      data-prototype-test={sampleAccountIdentity.isPrototypeTestAccount ? 'true' : undefined}
      aria-label="Demo login screen"
    >
      <button
        type="button"
        className="login-screen__back"
        onClick={onBack}
        aria-label="Back"
        data-node-id="260:9"
      >
        <img src={imgBack} alt="" className="login-screen__back-img" draggable={false} />
      </button>

      <div className="login-screen__content" data-node-id="260:8">
        <img
          src={imgWiseLogo}
          alt="Wise"
          className="login-screen__logo"
          data-node-id="260:11"
          width={108}
          height={25}
          draggable={false}
        />

        <div className="login-screen__avatar" data-node-id="260:12" aria-hidden="true">
          <span className="login-screen__avatar-initials" data-node-id="260:13">
            {avatarInitial}
          </span>
        </div>

        <h1 className="login-screen__name" data-node-id="260:15">
          {displayName}
        </h1>

        {maskedEmail ? (
          <p className="login-screen__email" data-node-id="260:16" aria-label={maskedEmail}>
            <span data-node-id="260:17">{maskedEmail.charAt(0)}</span>
            <span data-node-id="260:18">{maskedEmail.slice(1)}</span>
          </p>
        ) : null}

        <button
          type="button"
          className="login-screen__login-btn"
          onClick={onLogBackIn}
          data-node-id="260:19"
        >
          <span className="login-screen__login-btn-label" data-node-id="260:20">
            Log back in
          </span>
        </button>
      </div>

      <button
        type="button"
        className="login-screen__another"
        onClick={onUseAnotherAccount}
        data-node-id="260:21"
      >
        <span className="login-screen__another-text" data-node-id="260:22">
          Use another account
        </span>
      </button>
    </div>
  )
}

export default LoginScreen
