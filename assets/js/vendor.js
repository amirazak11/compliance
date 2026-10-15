/* =========================================================
   Quality Compliance – Vendor Portal interactions
   ========================================================= */
(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- AOS ---------- */
  if (window.AOS) AOS.init({ duration: 700, easing: "ease-out-cubic", once: true, offset: 40 });

  /* ---------- Language toggle (direction only) ---------- */
  // Bootstrap ships a separate RTL build – swap it in so selects, input groups,
  // validation icons and spacing utilities all mirror correctly.
  const bsLink = $('link[href*="bootstrap"][href$=".min.css"]:not([href*="icons"])');
  const applyLang = (lang) => {
    const rtl = lang === "ar";
    document.documentElement.lang = lang;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
    if (bsLink) {
      const href = bsLink.getAttribute("href").replace("bootstrap.rtl.min.css", "bootstrap.min.css");
      const next = rtl ? href.replace("bootstrap.min.css", "bootstrap.rtl.min.css") : href;
      if (bsLink.getAttribute("href") !== next) bsLink.setAttribute("href", next);
    }
    $$("[data-lang]").forEach((b) => b.classList.toggle("active", b.dataset.lang === lang));
  };
  const urlLang = new URLSearchParams(location.search).get("lang");
  try { applyLang(urlLang || localStorage.getItem("qc-lang") || "en"); } catch (e) { applyLang(urlLang || "en"); }
  $$("[data-lang]").forEach((btn) =>
    btn.addEventListener("click", () => {
      applyLang(btn.dataset.lang);
      try { localStorage.setItem("qc-lang", btn.dataset.lang); } catch (e) {}
    })
  );

  /* ---------- Toast ---------- */
  const toast = (msg) => {
    let el = $(".qc-toast");
    if (!el) { el = document.createElement("div"); el.className = "qc-toast"; document.body.appendChild(el); }
    el.innerHTML = '<i class="bi bi-check-circle-fill text-success me-2"></i>' + msg;
    el.classList.add("show");
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove("show"), 2200);
  };

  /* ---------- Password visibility ---------- */
  $$("[data-toggle-password]").forEach((icon) =>
    icon.addEventListener("click", () => {
      const input = $(icon.dataset.togglePassword);
      const show = input.type === "password";
      input.type = show ? "text" : "password";
      icon.classList.toggle("bi-eye", !show);
      icon.classList.toggle("bi-eye-slash", show);
    })
  );



  /* ---------- Copy to clipboard ---------- */
  $$("[data-copy]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const text = btn.dataset.copy;
      (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject())
        .catch(() => {})
        .finally(() => {
          btn.querySelector("i").className = "bi bi-check2 text-success";
          setTimeout(() => (btn.querySelector("i").className = "bi bi-copy"), 1500);
          toast("Tracking number copied");
        });
    })
  );

  /* ---------- Simple login validation ---------- */
  const loginForm = $("#loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      loginForm.classList.add("was-validated");
      if (!loginForm.checkValidity()) return;
      const btn = $("button[type=submit]", loginForm);
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Signing in…';
      setTimeout(() => (window.location.href = loginForm.getAttribute("action") || "vendor-requests.html"), 1200);
    });
  }

  /* ---------- Reset password ---------- */
  const resetForm = $("#resetForm");
  if (resetForm) {
    const pwd = $("#newPassword");
    const confirm = $("#confirmPassword");
    const bar = $(".qc-strength > span");
    const RULES = {
      length: (v) => v.length >= 8,
      case: (v) => /[a-z]/.test(v) && /[A-Z]/.test(v),
      number: (v) => /\d/.test(v),
      special: (v) => /[^A-Za-z0-9]/.test(v),
    };
    const check = () => {
      let passed = 0;
      $$(".qc-rules li").forEach((li) => {
        const ok = RULES[li.dataset.rule](pwd.value);
        if (ok) passed++;
        li.classList.toggle("ok", ok);
        $("i", li).className = ok ? "bi bi-check-circle-fill" : "bi bi-dot";
      });
      bar.style.width = passed * 25 + "%";
      bar.style.backgroundColor = ["#e5322d", "#e5322d", "#f59e0b", "#f59e0b", "#12a150"][passed];
      pwd.setCustomValidity(passed === 4 ? "" : "weak");
      confirm.setCustomValidity(confirm.value && confirm.value === pwd.value ? "" : "mismatch");
    };
    pwd.addEventListener("input", check);
    confirm.addEventListener("input", check);
    check();

    resetForm.addEventListener("submit", (e) => {
      e.preventDefault();
      check();
      resetForm.classList.add("was-validated");
      if (!resetForm.checkValidity()) return;
      const btn = $("button[type=submit]", resetForm);
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Updating…';
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = "Reset Password";
        bootstrap.Modal.getOrCreateInstance("#successModal").show();
      }, 1000);
    });
  }

  /* =========================================================
     Uploads
     ========================================================= */
  const ALLOWED = ["pdf", "jpg", "jpeg", "png"];
  const MAX = 10 * 1024 * 1024;
  const fmtSize = (b) => (b >= 1048576 ? (b / 1048576).toFixed(1) + " MB" : Math.max(1, Math.round(b / 1024)) + " KB");
  const fileIcon = (name) => (/\.(png|jpe?g)$/i.test(name) ? "bi-file-earmark-image" : "bi-file-earmark-pdf");

  const setBadge = (upload, state) => {
    const badge = $(".qc-upload-status", upload);
    if (!badge) return;
    const map = {
      uploaded: ['qc-badge uploaded no-dot', '<i class="bi bi-check-circle"></i> Uploaded'],
      uploading: ['qc-badge uploading no-dot', '<span class="spinner-border" style="width:.7rem;height:.7rem;border-width:.12em"></span> Uploading'],
      invalid: ['qc-badge invalid no-dot', '<i class="bi bi-exclamation-circle"></i> Invalid file'],
      empty: ["", ""],
    };
    badge.className = "qc-upload-status " + map[state][0];
    badge.innerHTML = map[state][1];
    upload.classList.toggle("is-invalid", state === "invalid");
  };

  const refreshBadge = (upload) => {
    const rows = $$(".qc-file-row", upload);
    if (!rows.length) return setBadge(upload, "empty");
    if (rows.some((r) => r.dataset.state === "invalid")) return setBadge(upload, "invalid");
    if (rows.some((r) => r.dataset.state === "uploading")) return setBadge(upload, "uploading");
    setBadge(upload, "uploaded");
  };

  const rowHead = (name, meta, metaClass, actions) => `
    <div class="d-flex align-items-center gap-2">
      <i class="bi ${fileIcon(name)} text-qc-red fs-5"></i>
      <div class="flex-grow-1" style="min-width:0">
        <div class="fw-semibold fs-xs text-truncate">${name}</div>
        <div class="fs-xxs ${metaClass}" data-meta>${meta}</div>
      </div>
      ${actions}
    </div>`;
  const trashBtn = '<button type="button" class="btn btn-sm text-danger p-1" data-remove aria-label="Remove"><i class="bi bi-trash3"></i></button>';

  const finishRow = (row, size) => {
    row.dataset.state = "uploaded";
    row.innerHTML = rowHead(row.dataset.name, fmtSize(size) + " · Uploaded successfully", "text-success", trashBtn);
    row.style.animation = "none"; void row.offsetWidth; row.style.animation = "";
    refreshBadge(row.closest(".qc-upload"));
  };

  const runProgress = (row, size, start = 0) => {
    const bar = $(".qc-progress > span", row);
    const meta = $("[data-meta]", row);
    let p = start;
    row._timer = setInterval(() => {
      p = Math.min(100, p + 4 + Math.random() * 9);
      bar.style.width = p + "%";
      meta.textContent = `${fmtSize((size * p) / 100)} of ${fmtSize(size)} · ${Math.round(p)}%`;
      if (p >= 100) { clearInterval(row._timer); setTimeout(() => finishRow(row, size), 300); }
    }, 180);
  };

  const addFile = (upload, file) => {
    const list = $(".qc-files", upload);
    const ext = file.name.split(".").pop().toLowerCase();
    const row = document.createElement("div");
    row.className = "qc-file-row mt-3";
    row.dataset.name = file.name;

    if (!ALLOWED.includes(ext) || file.size > MAX) {
      row.dataset.state = "invalid";
      row.innerHTML =
        rowHead(file.name, fmtSize(file.size) + " · " + (file.size > MAX ? "Too large" : "Not supported"), "text-danger", trashBtn) +
        '<div class="qc-file-error fs-xxs px-3 py-2 mt-2"><i class="bi bi-exclamation-circle me-1"></i>Unsupported file. Upload a PDF, JPG or PNG under 10 MB.</div>';
      list.appendChild(row);
      return refreshBadge(upload);
    }

    row.dataset.state = "uploading";
    row.innerHTML =
      rowHead(file.name, `0 KB of ${fmtSize(file.size)} · 0%`, "text-muted", "") +
      '<div class="qc-progress mt-2"><span></span></div>' +
      '<div class="text-end mt-1"><button type="button" class="btn btn-link btn-link-qc p-0 fs-xxs" data-cancel>Cancel upload</button></div>';
    list.appendChild(row);
    refreshBadge(upload);
    runProgress(row, file.size);
  };

  $$(".qc-upload").forEach((upload) => {
    const input = $("input[type=file]", upload);
    const drop = $(".qc-drop", upload);
    const single = !input.multiple;

    const handle = (files) => {
      if (!files.length) return;
      if (single) $$(".qc-file-row", upload).forEach((r) => { clearInterval(r._timer); r.remove(); });
      Array.from(files).forEach((f) => addFile(upload, f));
      input.value = "";
    };

    $$("[data-browse]", upload).forEach((b) => b.addEventListener("click", () => input.click()));
    drop.addEventListener("click", (e) => { if (!e.target.closest("[data-browse]")) input.click(); });
    input.addEventListener("change", () => handle(input.files));
    ["dragenter", "dragover"].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add("dragover"); }));
    ["dragleave", "drop"].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.remove("dragover"); }));
    drop.addEventListener("drop", (e) => handle(e.dataTransfer.files));

    upload.addEventListener("click", (e) => {
      const rm = e.target.closest("[data-remove], [data-cancel]");
      if (!rm) return;
      const row = rm.closest(".qc-file-row");
      clearInterval(row._timer);
      row.style.transition = "opacity .25s, transform .25s";
      row.style.opacity = "0"; row.style.transform = "translateX(20px)";
      setTimeout(() => { row.remove(); refreshBadge(upload); }, 250);
    });

    refreshBadge(upload);

    // demo rows that are "mid-upload" in the markup keep animating to completion
    $$('.qc-file-row[data-state="uploading"]', upload).forEach((row) =>
      setTimeout(() => runProgress(row, +row.dataset.size, +row.dataset.progress), 1500)
    );
  });

  /* =========================================================
     Registration wizard
     ========================================================= */
  const wizard = $("#registerForm");
  if (wizard) {
    const panes = $$(".qc-pane", wizard);
    const steps = $$(".qc-step");
    const counter = $("#stepCounter");
    const states = ["Completed", "In progress", "Upcoming"];
    let current = 0;

    const go = (i, back = false) => {
      panes[current].classList.remove("show", "back");
      current = i;
      panes[i].classList.add("show");
      panes[i].classList.toggle("back", back);
      steps.forEach((s, idx) => {
        s.classList.toggle("done", idx < i);
        s.classList.toggle("active", idx === i);
        $(".qc-step-dot", s).innerHTML = idx < i ? '<i class="bi bi-check-lg"></i>' : idx + 1;
        $(".qc-step-state", s).textContent = states[idx < i ? 0 : idx === i ? 1 : 2];
      });
      if (counter) counter.textContent = `Step ${i + 1} of ${panes.length}`;
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const paneValid = (pane) => {
      pane.classList.add("was-validated");
      const fields = $$("input, select, textarea", pane).filter((f) => f.type !== "file");
      const firstBad = fields.find((f) => !f.checkValidity());
      let uploadsOk = true;
      $$(".qc-upload[data-required]", pane).forEach((u) => {
        const ok = $$('.qc-file-row[data-state="uploaded"]', u).length > 0;
        if (!ok) { uploadsOk = false; u.classList.add("is-invalid"); u.style.animation = "qcShake .4s"; setTimeout(() => (u.style.animation = ""), 400); }
      });
      if (firstBad) { firstBad.focus({ preventScroll: true }); firstBad.scrollIntoView({ behavior: "smooth", block: "center" }); }
      return !firstBad && uploadsOk;
    };

    $$("[data-next]", wizard).forEach((b) =>
      b.addEventListener("click", () => { if (paneValid(panes[current])) go(current + 1); })
    );
    $$("[data-prev]", wizard).forEach((b) => b.addEventListener("click", () => go(current - 1, true)));

    wizard.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!paneValid(panes[current])) return;
      const btn = $("button[type=submit]", wizard);
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Registering…';
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = 'Register Now <i class="bi bi-arrow-right ms-1"></i>';
        bootstrap.Modal.getOrCreateInstance("#successModal").show();
      }, 1200);
    });

    // demo shortcut: ?step=2 or ?step=3 jumps straight to that step
    const qs = parseInt(new URLSearchParams(location.search).get("step"), 10);
    go(qs >= 1 && qs <= panes.length ? qs - 1 : 0);
  }

  /* =========================================================
     Edit information – change tracking
     ========================================================= */
  const editForm = $("#editForm");
  if (editForm) {
    const fields = $$("input:not([type=file]), select, textarea", editForm);
    const countEl = $("#changeCount");
    fields.forEach((f) => (f.dataset.original = f.value));
    const update = () => {
      let n = 0;
      fields.forEach((f) => {
        const changed = f.value !== f.dataset.original;
        f.classList.toggle("border-primary", changed);
        if (changed) n++;
      });
      countEl.textContent = n ? `${n} unsaved change${n > 1 ? "s" : ""}` : "No changes yet";
      countEl.classList.toggle("text-qc-navy", n > 0);
      countEl.classList.toggle("fw-semibold", n > 0);
    };
    editForm.addEventListener("input", update);
    editForm.addEventListener("change", update);

    $("#resetEdit")?.addEventListener("click", () => {
      fields.forEach((f) => (f.value = f.dataset.original));
      editForm.classList.remove("was-validated");
      update();
    });

    editForm.addEventListener("submit", (e) => {
      e.preventDefault();
      editForm.classList.add("was-validated");
      const bad = fields.find((f) => !f.checkValidity());
      if (bad) return bad.scrollIntoView({ behavior: "smooth", block: "center" });
      const btn = $("button[type=submit]", editForm);
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Submitting…';
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = 'Save Changes <i class="bi bi-arrow-right ms-1"></i>';
        bootstrap.Modal.getOrCreateInstance("#successModal").show();
      }, 1200);
    });
  }

  /* =========================================================
     Requests list – filter / sort / track
     ========================================================= */
  const table = $("#requestsTable");
  if (table) {
    const tbody = $("tbody", table);
    const rows = $$("tr[data-status]", tbody);
    const showing = $("#showingText");
    const empty = $("#emptyRow");
    let filter = "all";

    const render = (highlight) => {
      let i = 0;
      $$("tr[data-status]", tbody).forEach((r) => {
        const show = filter === "all" || r.dataset.status === filter;
        r.classList.toggle("d-none", !show);
        r.classList.remove("row-in", "highlight");
        if (show) { void r.offsetWidth; r.style.animationDelay = i++ * 0.06 + "s"; r.classList.add("row-in"); }
      });
      empty.classList.toggle("d-none", i > 0);
      showing.textContent = i ? `Showing 1–${i} of ${i} request${i > 1 ? "s" : ""}` : "No requests";
      if (highlight) {
        highlight.style.animationDelay = "0s";
        highlight.classList.remove("row-in"); void highlight.offsetWidth; highlight.classList.add("highlight");
        highlight.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    $$("[data-filter]").forEach((chip) =>
      chip.addEventListener("click", () => {
        $$("[data-filter]").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        filter = chip.dataset.filter;
        render();
      })
    );

    const sortBtn = $("#sortToggle");
    sortBtn?.addEventListener("click", () => {
      const newest = sortBtn.dataset.order !== "oldest";
      sortBtn.dataset.order = newest ? "oldest" : "newest";
      $("span", sortBtn).textContent = newest ? "Oldest first" : "Newest first";
      $("i", sortBtn).style.transform = newest ? "rotate(180deg)" : "";
      rows.slice().sort((a, b) => (newest ? a.dataset.date.localeCompare(b.dataset.date) : b.dataset.date.localeCompare(a.dataset.date)))
        .forEach((r) => tbody.insertBefore(r, empty));
      render();
    });

    const track = $("#trackForm");
    track?.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = $("input", track);
      const q = input.value.trim().toUpperCase();
      const row = rows.find((r) => r.dataset.id === q);
      input.classList.toggle("is-invalid", !row);
      if (!row) return;
      filter = "all";
      $$("[data-filter]").forEach((c) => c.classList.toggle("active", c.dataset.filter === "all"));
      render(row);
    });
    $("#trackForm input")?.addEventListener("input", (e) => e.target.classList.remove("is-invalid"));

    render();
  }
})();
