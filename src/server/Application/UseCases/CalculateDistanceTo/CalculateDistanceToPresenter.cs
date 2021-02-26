﻿using System;
using Domain;

namespace Application.UseCases.CalculateDistanceTo
{
    public sealed class CalculateDistanceToPresenter : IOutputPort
    {
        public Distance Distance { get; private set; }
        public bool IsInvalid { get; private set; }
        public void Invalid() => this.IsInvalid = true;

        public void Ok(Distance distance) => this.Distance = distance;
    }
}