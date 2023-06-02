function Join() {
  return (
    <section>
      <h1>회원가입</h1>
      <article>
        <form>
          <input data-testid="email-input" />
          <input data-testid="password-input" />
          <button data-testid="signup-button">회원가입</button>
        </form>
      </article>
    </section>
  );
}

export default Join;
